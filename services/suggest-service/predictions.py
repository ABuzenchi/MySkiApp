from models import TrackData
from datetime import datetime
from typing import Dict

def predict_season_km(data: TrackData) -> Dict:
    total_km = 0
    unique_days = set()

    for day in data.dayTracks:
        unique_days.add(day.date)
        for entry in day.slopes:
            slope = next((s for s in data.slopesInfo if s.id == entry.slopeId), None)
            if slope:
                total_km += slope.length * entry.times

    if not unique_days:
        return {"estimatedTotal": 0, "averagePerDay": 0, "seasonPrediction": 0}

    # Media per zi
    average_per_day = total_km / len(unique_days)

    # Estimare: sezon de ~90 zile
    season_prediction = round(average_per_day * 90, 2)

    return {
        "totalLogged": round(total_km, 2),
        "daysTracked": len(unique_days),
        "averagePerDay": round(average_per_day, 2),
        "seasonPrediction": season_prediction
    }
