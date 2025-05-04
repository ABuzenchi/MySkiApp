from fastapi import FastAPI
from models import TrackData
from suggestions import get_suggestions
from predictions import predict_season_km


app = FastAPI()

@app.get("/")
def root():
    return {"message": "Microserviciul de sugestii & predicții e activ 🎿"}

@app.post("/suggest")
def suggest_slopes(data: TrackData):
    suggestions = get_suggestions(data)
    return {"suggestedSlopes": suggestions}

@app.post("/predict")
def predict(data: TrackData):
    result = predict_season_km(data)
    return result
