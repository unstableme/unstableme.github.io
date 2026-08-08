import re
import sys
import os
from google import genai
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.messages import HumanMessage, AIMessage

load_dotenv()

GEMINI_MODELS = ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.1-pro-preview"]

# initialize Gemini client — supports both env var names
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
if api_key == "":
    api_key = None

try:
    if api_key:
        _gemini_client = genai.Client(api_key=api_key)
    else:
        print("WARNING: GEMINI_API_KEY not set, Gemini calls will fail", file=sys.stderr)
        _gemini_client = None
except Exception as e:
    print(f"WARNING: Gemini client init failed: {e}", file=sys.stderr)
    _gemini_client = None

# lazy globals
_retriever = None
_chat_histories: dict[str, list] = {}  # per-session history


def _init_rag():
    """Initialize RAG components lazily (called on first query)."""
    global _retriever

    if _retriever is not None:
        return

    print("Initializing RAG components...", file=sys.stderr)

    embedding_model = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    db = Chroma(
        persist_directory="vectordb",
        embedding_function=embedding_model
    )

    _retriever = db.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3}
    )

    print("RAG ready", file=sys.stderr)


def _call_gemini(prompt: str) -> str:
    """Call Gemini with fallback across models if one fails or hits quota."""
    if not _gemini_client:
        raise RuntimeError("Gemini client not initialized — set GEMINI_API_KEY")

    for model in GEMINI_MODELS:
        try:
            response = _gemini_client.models.generate_content(model=model, contents=prompt)
            return response.text
        except Exception as e:
            print(f"{model} failed: {e}, trying next...", file=sys.stderr)

    raise RuntimeError("All Gemini models failed")


def _strip_markdown(text: str) -> str:
    """Fallback cleanup in case the model still emits markdown markers."""
    text = re.sub(r"\*\*(.+?)\*\*", r"\1", text)      # **bold**
    text = re.sub(r"(?<!\w)\*(\S[^*]*?)\*(?!\w)", r"\1", text)  # *italic*
    text = re.sub(r"^\s*[\*\-]\s+", "- ", text, flags=re.MULTILINE)  # * bullets -> plain dashes
    text = re.sub(r"^#+\s*", "", text, flags=re.MULTILINE)  # headers
    return text


def _format_docs(docs):
    return "\n\n".join(d.page_content for d in docs)


def _history_text(history: list) -> str:
    return "\n".join(
        f"{'User' if isinstance(m, HumanMessage) else 'Assistant'}: {m.content}"
        for m in history
    )


def answer_query(query: str, session_id: str) -> str:
    _init_rag()

    history = _chat_histories.setdefault(session_id, [])

    # rewrite question using history so retrieval is accurate
    if history:
        rewrite_prompt = (
            f"Chat history:\n{_history_text(history)}\n\n"
            f"Rewrite this message as a standalone question, resolving references to the chat history. "
            f"If it is not a question (e.g. a greeting or small talk), return it unchanged. "
            f"Return only the rewritten message, nothing else.\n\nMessage: {query}"
        )
        search_question = _call_gemini(rewrite_prompt).strip()
    else:
        search_question = query

    docs = _retriever.invoke(search_question)
    context = _format_docs(docs)

    answer_prompt = (
        f"You are a friendly assistant on Santosh's portfolio website, chatting with a visitor.\n"
        f"Rules:\n"
        f"- Base every factual claim about Santosh ONLY on the context below. Never invent details about him.\n"
        f"- If the visitor greets you, introduces themselves, thanks you, or makes small talk, respond warmly "
        f"and naturally (use their name if they shared it), then invite them to ask about Santosh. "
        f"Small talk does not need the context.\n"
        f"- If asked whether something is mentioned in Santosh's CV, papers, or portfolio and the context "
        f"does not contain it, give a direct answer like 'No, that doesn't appear in Santosh's CV or portfolio' "
        f"instead of 'I don't know'.\n"
        f"- If specific information about Santosh is missing from the context, say his portfolio doesn't cover "
        f"that and briefly mention the kinds of things you can answer (his work, projects, skills, education, publications).\n"
        f"- Reply in plain conversational text only: no markdown, no asterisks, no bullet points, no headers.\n\n"
        f"Context:\n{context}\n\n"
    )
    if history:
        answer_prompt += f"Chat history:\n{_history_text(history)}\n\n"
    answer_prompt += f"User: {query}"

    answer = _strip_markdown(_call_gemini(answer_prompt).strip())

    history.extend([
        HumanMessage(content=query),
        AIMessage(content=answer)
    ])

    return answer
