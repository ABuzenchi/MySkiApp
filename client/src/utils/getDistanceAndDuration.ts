import { LatLngExpression } from "leaflet";
import polyline from "@mapbox/polyline";

export async function getDistanceAndDuration(
  start: [number, number],
  end: [number, number]
): Promise<{ distance: string; duration: string; geometry: LatLngExpression[] }> {
  const response = await fetch("http://localhost:3000/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ start, end }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Eroare proxy backend:", errorText);
    throw new Error("Eroare la calculul rutei");
  }

  const data = await response.json();
  const meters = data.routes[0].summary.distance;
  const seconds = data.routes[0].summary.duration;
  const encoded = data.routes[0].geometry;

  const decoded = polyline.decode(encoded);
  const coordinates: LatLngExpression[] = decoded.map(([lat, lng]) => [lat, lng]);

  return {
    distance: `${(meters / 1000).toFixed(2)} km`,
    duration: `${Math.round(seconds / 60)} min`,
    geometry: coordinates,
  };
}
