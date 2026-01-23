FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download embeddings for faster first request
RUN python -c "from sentence_transformers import SentenceTransformer; \
    SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')"

COPY . .

# create data folder and download PDFs
RUN mkdir -p data

RUN python -c "import urllib.request; urllib.request.urlretrieve('https://raw.githubusercontent.com/unstableme/Complete_Pipeline_BreastCancerGradCAM/main/Paper_on_IDC_detection_using_CNN.pdf', 'data/Paper_on_IDC_detection_using_CNN.pdf')"
RUN python -c "import urllib.request; urllib.request.urlretrieve('https://unstableme.github.io/Santosh_Sapkota_CV.pdf','data/Santosh_Sapkota_CV.pdf')"

# Install system dependencies for opencv, unstructured, and PDF processing
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libgomp1 \
    poppler-utils \
    tesseract-ocr \
    && rm -rf /var/lib/apt/lists/*

RUN python -m rag.ingest

EXPOSE 7860

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
