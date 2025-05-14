from fastapi import FastAPI
from pydantic import BaseModel
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain_ollama.llms import OllamaLLM
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

load_dotenv()

class QuestionRequest(BaseModel):
    question: str

app = FastAPI()

@app.post("/ask")
async def ask_question(payload: QuestionRequest):
    question = payload.question

    # Embeddings + Vectorstore
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    vectorstore = MongoDBAtlasVectorSearch.from_connection_string(
        connection_string=os.getenv("MONGODB_URI"),
        namespace=os.getenv("MONGODB_COLLECTION"),  # ex: "MySkiApp.documents"
        embedding=embeddings,
        index_name="default"
    )

    # LLM
    llm = OllamaLLM(model="llama3")

    # Retrieval QA chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        return_source_documents=True,
    )

    # Rulare și extragere răspuns + surse
    result = qa_chain.invoke({"query": question})
    answer = result["result"]
    sources = list(set(doc.metadata.get("filename", "necunoscut") for doc in result["source_documents"]))

    if not sources or answer.strip() == "" or answer.strip().lower() in ["i don't know.", "nu știu."]:
        return {"answer": "Îmi pare rău, nu am informațiile necesare pentru a răspunde la această întrebare."}
    
    return {
        "answer": answer,
        "sources": sources
    }
