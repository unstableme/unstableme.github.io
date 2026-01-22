from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace, HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()
parser = StrOutputParser()

llm = HuggingFaceEndpoint(
    repo_id="Qwen/Qwen2.5-1.5B-Instruct",
    task="text-generation"
)

model = ChatHuggingFace(llm=llm)

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = Chroma(
    persist_directory="vectordb",
    embedding_function=embedding_model
)

retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})

def format_docs(docs):
    return "\n\n".join(d.page_content for d in docs)

chat_history = []

def answer_query(query:str):
    if chat_history:
        rewrite_prompt = ChatPromptTemplate.from_messages([
            SystemMessage(content="Based on the chat history, rewrite this question as a standalone question."),
            *chat_history,
            HumanMessage(content=f"New question: {query}")
        ])
        result = model.invoke(rewrite_prompt.format_messages())
        search_question = result.content.strip()
        
    else:
        search_question = query

    docs = retriever.invoke(search_question)
    context = format_docs(docs)

    answer_prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content=f"""You are an assistant answering questions about Santosh.
        Use ONLY the context below. If the answer is not in the context, say you don't know.
        context:
        {context}"""),
        *chat_history,
        HumanMessage(content=query)
    ])
    response = model.invoke(answer_prompt.format_messages())
    answer = response.content.strip()

    chat_history.append(HumanMessage(content=query))
    chat_history.append(AIMessage(content=answer))

    return answer

