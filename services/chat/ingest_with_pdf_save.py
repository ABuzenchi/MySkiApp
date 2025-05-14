from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from langchain_ollama.embeddings import OllamaEmbeddings
from pymongo import MongoClient
import gridfs
from dotenv import load_dotenv
import os

load_dotenv()

# MongoDB setup
client = MongoClient(os.getenv("MONGODB_URI"))
db = client["MySkiApp"]
fs = gridfs.GridFS(db)
collection = db["documents"]

# Fișierul PDF de procesat
filename = "Skiing tradition.pdf"
pdf_path = os.path.join(os.path.dirname(__file__), "docs", filename)

# Verifică dacă fișierul este deja salvat în GridFS
existing_file = fs.find_one({"filename": filename})
if existing_file:
    file_id = existing_file._id
    print(f"📄 Fișierul '{filename}' deja există în GridFS cu ID: {file_id}")
else:
    with open(pdf_path, "rb") as f:
        file_id = fs.put(f, filename=filename)
        print(f"✅ PDF salvat în MongoDB cu ID: {file_id}")

# Extrage conținutul text din PDF
loader = PyPDFLoader(pdf_path)
docs = loader.load()

# Atașează metadate: nume fișier și ID GridFS
for doc in docs:
    doc.metadata["file_id"] = str(file_id)
    doc.metadata["filename"] = filename

# Split în bucăți
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)

# Embedding
embeddings = OllamaEmbeddings(model="nomic-embed-text")

# Indexare în MongoDB Atlas Vector Search
vectorstore = MongoDBAtlasVectorSearch.from_documents(
    documents=chunks,
    embedding=embeddings,
    collection=collection,
    index_name="default"
)

print(f"✅ {len(chunks)} bucăți de text au fost indexate și legate corect de fișierul '{filename}'.")
