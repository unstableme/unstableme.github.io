import sys
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace, HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

# lazy globals
_model = None
_retriever = None
_parser = StrOutputParser()
_chat_history = []


def _init_rag():
    """Initialize RAG components lazily (called on first query)."""
    global _model, _retriever

    if _model is not None:
        return

    print("Initializing RAG components...", file=sys.stderr)

    llm = HuggingFaceEndpoint(
        repo_id="Qwen/Qwen2.5-1.5B-Instruct",
        task="text-generation"
    )
    _model = ChatHuggingFace(llm=llm)

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


def _format_docs(docs):
    return "\n\n".join(d.page_content for d in docs)


def answer_query(query: str) -> str:
    _init_rag()

    # rewrite question if chat history exists
    if _chat_history:
        rewrite_prompt = ChatPromptTemplate.from_messages([
            SystemMessage(content="Based on the chat history, rewrite this question as a standalone question."),
            *_chat_history,
            HumanMessage(content=f"New question: {query}")
        ])
        rewritten = _model.invoke(rewrite_prompt.format_messages())
        search_question = rewritten.content.strip()
    else:
        search_question = query

    docs = _retriever.invoke(search_question)
    context = _format_docs(docs)

    answer_prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content=f"""You are an assistant answering questions about Santosh.
Use ONLY the context below. If the answer is not in the context, say you don't know.

context:
{context}"""),
        *_chat_history,
        HumanMessage(content=query)
    ])

    response = _model.invoke(answer_prompt.format_messages())
    answer = response.content.strip()

    _chat_history.extend([
        HumanMessage(content=query),
        AIMessage(content=answer)
    ])

    return answer
