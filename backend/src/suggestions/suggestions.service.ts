// backend/src/suggestions/suggestions.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SuggestionsService {
  async getPredictionFromFastAPI(data: any): Promise<any> {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`FastAPI error: ${error}`);
    }

    return response.json();
  }

  async getSuggestionsFromFastAPI(data: any): Promise<any> {
    const response = await fetch('http://localhost:8000/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`FastAPI error: ${error}`);
    }

    return response.json();
  }
}
