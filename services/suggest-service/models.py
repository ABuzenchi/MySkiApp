from pydantic import BaseModel
from typing import List

class Slope(BaseModel):
    id: str
    name: str
    location: str
    length: float
    difficulty: str

class SlopeEntry(BaseModel):
    slopeId: str
    times: int

class DayTrack(BaseModel):
    date: str
    slopes: List[SlopeEntry]

class TrackData(BaseModel):
    slopesInfo: List[Slope]
    dayTracks: List[DayTrack]
