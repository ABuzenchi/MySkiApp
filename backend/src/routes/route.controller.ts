import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import fetch from 'node-fetch';

@Controller('route')
export class RouteController {
  @Post()
  async getRoute(@Body() body: { start: [number, number]; end: [number, number] }) {
    const orsKey = process.env.ORS_API_KEY;
    if (!orsKey) {
      throw new HttpException('ORS_API_KEY lipsește din .env', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const requestBody = {
      coordinates: [body.start, body.end],
      radiuses: [1000, 1000],
    };

    console.log("➡️ Cerere spre ORS:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car', {
        method: 'POST',
        headers: {
          'Authorization': orsKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();
      console.log("⬅️ Răspuns ORS:", responseText);

      if (!response.ok) {
        throw new HttpException('Eroare de la ORS', HttpStatus.BAD_REQUEST);
      }

      const data = JSON.parse(responseText);
      return data;
    } catch (error) {
      console.error("Eroare la fetch ORS:", error);
      throw new HttpException('Eroare la calcul rută', HttpStatus.BAD_REQUEST);
    }
  }
}
