from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from rag.chain import answer_query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    answer: str

@app.get("/")
def health():
    return {"status": "ok", "message": "RAG is working!"}

@app.post("/chat", response_model=ChatResponse)
def chat(req:ChatRequest):
    answer = answer_query(req.query)
    return {"answer": answer}