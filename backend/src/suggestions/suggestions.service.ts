// backend/src/suggestions/suggestions.service.ts
import { Injectable } from '@nestjs/common';
import { SlopeService } from 'src/slope/slope.service';

@Injectable()
export class SuggestionsService {
  constructor(private readonly slopeService: SlopeService) {}
  async getPredictionFromFastAPI(data: { dayTracks: any[] }): Promise<any> {
  const slopesInfo = await this.slopeService.getAllForAI(); // 🧠 populat cu .name, .location etc

  const payload = {
    slopesInfo,
    dayTracks: data.dayTracks,
  };

  const response = await fetch('http://localhost:8000/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`FastAPI error: ${error}`);
  }

  return response.json();
}


  async getSuggestionsFromFastAPI(data: { dayTracks: any[] }): Promise<any> {
  const slopesInfo = await this.slopeService.getAllForAI();

  const payload = {
    slopesInfo,
    dayTracks: data.dayTracks,
  };

  const response = await fetch('http://localhost:8000/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`FastAPI error: ${error}`);
  }

  return response.json();
}

}
