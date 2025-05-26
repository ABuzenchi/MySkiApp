from models import TrackData, Slope
from collections import defaultdict
from typing import List

def get_suggestions(data: TrackData) -> List[Slope]:
    visited = set()
    slope_freq = defaultdict(int)

    # Parcurge DayTrack-urile
    for day in data.dayTracks:
        for entry in day.slopes:
            visited.add(entry.slopeId)
            slope_freq[entry.slopeId] += entry.times

    # Cele mai frecvent vizitate
    top_ids = sorted(slope_freq, key=slope_freq.get, reverse=True)[:3]
    top_slopes = [s for s in data.slopesInfo if s.id in top_ids]

    # Găsește pârtii similare dar nevizitate
    unvisited = [s for s in data.slopesInfo if s.id not in visited]
    suggestions = []

    for top in top_slopes:
        for cand in unvisited:
            if (
                cand.difficulty == top.difficulty and
                abs(cand.length - top.length) < 0.5 * top.length and
                cand.location == top.location and
                cand not in suggestions
            ):
                suggestions.append(cand)
            if len(suggestions) >= 5:
                break
        if len(suggestions) >= 5:
            break

    return suggestions[:3]  # returnează max 3 sugestii
