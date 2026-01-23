import sys
import traceback

print("=" * 50, file=sys.stderr)
print("Starting FastAPI application...", file=sys.stderr)
print("=" * 50, file=sys.stderr)

try:
    from fastapi import FastAPI
    from pydantic import BaseModel
    from fastapi.middleware.cors import CORSMiddleware
    print("✓ FastAPI imports successful", file=sys.stderr)
    
    from rag.chain import answer_query
    print("✓ RAG chain import successful", file=sys.stderr)
    
except Exception as e:
    print(f"✗ IMPORT FAILED: {e}", file=sys.stderr)
    traceback.print_exc(file=sys.stderr)
    sys.exit(1)

app = FastAPI()
print("✓ FastAPI app created", file=sys.stderr)

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
def chat(req: ChatRequest):
    answer = answer_query(req.query)
    return {"answer": answer}

print("✓ All routes registered", file=sys.stderr)
print("=" * 50, file=sys.stderr)