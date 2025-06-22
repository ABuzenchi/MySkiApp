import { LatLngExpression } from "leaflet";

export function areLocationsEqual(a: LatLngExpression, b: LatLngExpression, tolerance = 0.0001): boolean {
  const [aLat, aLng] = Array.isArray(a) ? a : [a.lat, a.lng];
  const [bLat, bLng] = Array.isArray(b) ? b : [b.lat, b.lng];
  return Math.abs(aLat - bLat) < tolerance && Math.abs(aLng - bLng) < tolerance;
}
