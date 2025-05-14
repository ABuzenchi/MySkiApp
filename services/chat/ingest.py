from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from langchain_ollama.embeddings import OllamaEmbeddings
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

pdf_path = os.path.join(os.path.dirname(__file__), "docs", "Document fără titlu.pdf")

# ✅ Schimbare aici:
loader = PyPDFLoader(pdf_path)
docs = loader.load()

# Debug info:
print(f"Loaded {len(docs)} documents from PDF.")
for i, doc in enumerate(docs[:2]):
    print(f"--- DOC {i+1} ---\n{doc.page_content[:300]}\n")

# Split
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)

# Embed
embeddings = OllamaEmbeddings(model="nomic-embed-text")
client = MongoClient(os.getenv("MONGODB_URI"))
collection = client["MySkiApp"]["documents"]

# Save
vectorstore = MongoDBAtlasVectorSearch.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection=collection,
    index_name="default"
)

print(f"Ingested {len(chunks)} chunks from PDF into MongoDB Atlas.")
