import polyline from "@mapbox/polyline";
import { LatLngExpression } from "leaflet";


export async function getDistanceAndDuration(
  start: [number, number],
  end: [number, number]
): Promise<{ distance: string; duration: string; geometry: LatLngExpression[] }> {
  const apiKey = import.meta.env.VITE_ROUTE_CALCULATION;
  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coordinates: [start, end],
      radiuses: [1000, 1000],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("ORS Error Response:", errorText);
    throw new Error("Eroare la calculul distanței");
  }

  const data = await response.json();
  const meters = data.routes[0].summary.distance;
  const seconds = data.routes[0].summary.duration;
  const geometry = data.routes[0].geometry;

  // Decode geometry into array of [lat, lng]
  const decoded = polyline.decode(geometry);
  const coordinates: LatLngExpression[] = decoded.map(([lat, lng]) => [lat, lng]);

  return {
    distance: `${(meters / 1000).toFixed(2)} km`,
    duration: `${Math.round(seconds / 60)} min`,
    geometry: coordinates,
  };
}
