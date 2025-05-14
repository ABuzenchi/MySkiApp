from fastapi import FastAPI, Request
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores.mongodb_atlas import MongoDBAtlasVectorSearch
from langchain.chains import RetrievalQA
from langchain_community.chat_models import ChatOllama


from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Setup Mongo client
client = MongoClient(os.getenv("MONGODB_ATLAS_URI"))
db = client["chatdb"]  # Numele bazei
collection_name = "chat-knowledge"  # Numele colecției

# Creează vectorstore
vectorstore = MongoDBAtlasVectorSearch(
    collection=db[collection_name],
    embedding=OllamaEmbeddings(model="nomic-embed-text"),
)

# Config chain
retriever = vectorstore.as_retriever()
qa_chain = RetrievalQA.from_chain_type(
    lllm=ChatOllama(model="llama3"),
    retriever=retriever,
    return_source_documents=True
)

@app.post("/ask")
async def ask_question(request: Request):
    data = await request.json()
    question = data.get("question")
    if not question:
        return {"error": "No question provided"}
    result = qa_chain.run(question)
    return {"answer": result}
