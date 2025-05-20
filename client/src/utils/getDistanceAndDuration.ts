export async function getDistanceAndDuration(
  start: [number, number],
  end: [number, number]
): Promise<{ distance: string; duration: string }> {
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
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("ORS Error Response:", errorText);
    throw new Error("Eroare la calculul distanței");
  }

  const data = await response.json();

  // corect: folosim .routes[0].summary, nu .features[0].properties.summary
  const meters = data.routes[0].summary.distance;
  const seconds = data.routes[0].summary.duration;

  const km = (meters / 1000).toFixed(2);
  const mins = Math.round(seconds / 60);

  return {
    distance: `${km} km`,
    duration: `${mins} min`,
  };
}
