from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma 
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace, HuggingFaceEmbeddings
from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document

from unstructured.partition.pdf import partition_pdf
from unstructured.chunking.title import chunk_by_title
from dotenv import load_dotenv

load_dotenv()
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def partition_document(file_path:str):
    """Extract elements from PDF using unstructured library."""
    elements = partition_pdf(
        filename=file_path,
        strategy="hi_res",
        infer_table_structure=True,
        extract_image_block_types=["Image"],
        extract_image_block_to_payload=True
    )
    # print(f"Extracted {len(elements)} elements")
    # print(elements)
    return elements


cvdocuments = partition_document("data/Santosh_Sapkota_CV.pdf")
paperdocuments = partition_document("data/Paper_on_IDC_detection_using_CNN.pdf")

cv_chunks_list = chunk_by_title(cvdocuments, max_characters=1200, new_after_n_chars=1000, combine_text_under_n_chars=300)
paper_chunks_list = chunk_by_title(paperdocuments, max_characters=4000, new_after_n_chars=3500, combine_text_under_n_chars=500)

# cv_chunk_texts = [chunk.text for chunk in cv_chunks[0:3]]
# print(cv_chunk_texts)

# paper_chunk_texts = [chunk.text for chunk in paper_chunks[0:3]]
# print(paper_chunk_texts)

def summarize_with_llm(content, content_type):
    """ Uses LLM to get the summary of the images and tables
        to be fed into content which can only include text as embeddings."""
    llm = HuggingFaceEndpoint(
        repo_id="Qwen/Qwen2.5-1.5B-Instruct",
        task="text-generation",
        max_new_tokens=200
    )
    model = ChatHuggingFace(llm=llm)

    if content_type == "table":
        prompt = PromptTemplate(
            template="""
            Summarize the following table into a maximum of 3 sentences.
            Include key facts and numbers.

            {content}
            """,
            input_variables=["content"]
        )

    elif content_type == "image":
        prompt = PromptTemplate(
            template="""
            Summarize the following image description into a maximum of 3 sentences.
            Focus on visual patterns and meaning.

            {content}
            """,
            input_variables=["content"]
        )
    else:
        return ""

    formatted_prompt = prompt.format(content=content)
    response = model.invoke(formatted_prompt)

    return response.content if hasattr(response, "content") else response


def extract_content_with_summary(chunk, use_summarizer=False):
    """Extract the content from chunks for two pdfs and also returns summary from llm."""
    content = {
        "text": chunk.text if hasattr(chunk, "text") else "",
        "tables": [],
        "images": []
    }
    if hasattr(chunk, "metadata") and hasattr(chunk.metadata, "orig_elements"):
        for element in chunk.metadata.orig_elements:
            element_type = type(element).__name__

            if element_type == "Table":
                table_html = getattr(element.metadata, "text_as_html", "element.text")
                content["tables"].append(table_html)

                if use_summarizer:
                    summary = summarize_with_llm(table_html, content_type="table")
                    content["text"] += f"\n\n[Table: {summary}]"

            elif element_type == "Image":
                img_b64 = getattr(element.metadata, "image_base64", "None")
                if img_b64:
                    content["images"].append(img_b64)

                    if use_summarizer:
                        # here we are not using summarizer for image because this qwen cant handle images
                        # summary = summarize_with_llm("img_b64", content_type="image")
                        # content["text"] += f"\n\n[Image: {summary}]"
                        pass

    return content          

# did this to make similar format to add to papercontent to make one bigger chunk
cv_processed_chunks = [{"text": getattr(c, "text", ""), "tables":[], "images": []} for c in cv_chunks_list]

paper_processed_chunks = [extract_content_with_summary(c, use_summarizer=False) for c in paper_chunks_list]

# why not the use website itself for another sources of data 
website_url = "https://unstableme.github.io/"
loader = WebBaseLoader(website_url)
website_docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=200)
website_chunks = text_splitter.split_documents(website_docs)
website_processed_chunks = [{"text": chunk.page_content, "tables":[], "images": []} for chunk in website_chunks]

# combining into a single bigger chunk
all_processed_chunks = cv_processed_chunks + paper_processed_chunks + website_processed_chunks

# print(all_processed_chunks[:3])

all_docs_for_chroma = [
    Document(
        page_content=chunks["text"],
        metadata={
            "tables": str(chunks.get("tables", [])),
            "images": str(chunks.get("images", [])),
        }
    )
    for chunks in all_processed_chunks
]

vector_store = Chroma.from_documents(
    documents=all_docs_for_chroma,
    embedding=embedding_model,
    persist_directory="vectordb"
)

vector_store.persist()
print("Chroma vector store created and persisted.")

