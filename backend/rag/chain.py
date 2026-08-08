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
            f"Rewrite this as a standalone question: {query}"
        )
        search_question = _call_gemini(rewrite_prompt).strip()
    else:
        search_question = query

    docs = _retriever.invoke(search_question)
    context = _format_docs(docs)

    answer_prompt = (
        f"You are an assistant answering questions about Santosh.\n"
        f"Use ONLY the context below. If the answer is not in the context, say you don't know.\n\n"
        f"Context:\n{context}\n\n"
    )
    if history:
        answer_prompt += f"Chat history:\n{_history_text(history)}\n\n"
    answer_prompt += f"User: {query}"

    answer = _call_gemini(answer_prompt).strip()

    history.extend([
        HumanMessage(content=query),
        AIMessage(content=answer)
    ])

    return answer
