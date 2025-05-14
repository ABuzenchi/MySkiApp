// 📁 src/chat/chat.service.ts
import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class ChatService {
  async ask(question: string): Promise<{ answer: string; sources?: string[] }> {
    try {
      const response = await fetch('http://localhost:8001/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Eroare în comunicarea cu microserviciul AI:', error);
      throw new HttpException('Eroare la procesarea întrebării.', 500);
    }
  }
}
