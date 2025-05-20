import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDistanceAndDuration } from "../../utils/getDistanceAndDuration";
import LocateUser from "../userLocation/userLocation";
import { Polyline } from "react-leaflet";

function toTuple(loc: LatLngExpression): [number, number] {
  if (Array.isArray(loc)) {
    const [lat, lng] = loc;
    return [lat, lng]; // forțăm să fie [number, number]
  }
  if ("lat" in loc && "lng" in loc) return [loc.lat, loc.lng];
  throw new Error("Coordonatele nu sunt într-un format valid");
}

interface SearchResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

const skiIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function ChangeView({
  center,
  zoom,
}: {
  center: LatLngExpression;
  zoom: number;
}) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapSearch = () => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(
    null
  );
  const [routeLine, setRouteLine] = useState<LatLngExpression[] | null>(null);

  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([45.5, 25.5]);
  const [selectedLocation, setSelectedLocation] =
    useState<LatLngExpression | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data: SearchResult[] = await response.json();
      setSearchResults(data);

      if (data.length > 0) {
        const firstResult = data[0];
        const newCenter: LatLngExpression = [
          parseFloat(firstResult.lat),
          parseFloat(firstResult.lon),
        ];
        setMapCenter(newCenter);
        setSelectedLocation(newCenter);
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
    }
  };

  useEffect(() => {
    if (userLocation && selectedLocation) {
      console.log("userLocation:", userLocation);
      console.log("selectedLocation:", selectedLocation);
      const start = toTuple(userLocation);
      const end = toTuple(selectedLocation);
      console.log("start:", start, "end:", end);

      if (
        typeof start[0] !== "number" ||
        typeof start[1] !== "number" ||
        typeof end[0] !== "number" ||
        typeof end[1] !== "number"
      ) {
        console.error("Coordonatele nu sunt valide");
        return;
      }

      getDistanceAndDuration([start[1], start[0]], [end[1], end[0]])
        .then((info) => {
          setRouteInfo({ distance: info.distance, duration: info.duration });
          setRouteLine(info.geometry); // aici salvăm traseul
        })
        .catch(console.error);
    }
  }, [userLocation, selectedLocation]);

  return (
    <div>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a location..."
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Search
        </button>
      </form>

      <MapContainer
        center={mapCenter}
        zoom={7}
        style={{ height: "500px", width: "100%" }}
      >
        <LocateUser setUserLocation={setUserLocation} />
        <ChangeView center={mapCenter} zoom={7} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedLocation && (
          <Marker position={selectedLocation} icon={skiIcon}>
            <Popup>
              Searched Location: <br />
              {searchQuery}
            </Popup>
          </Marker>
        )}
        {routeLine && <Polyline positions={routeLine} color="blue" />}
      </MapContainer>

      {routeInfo && (
        <div style={{ marginTop: "20px" }}>
          <h3>Informații rută:</h3>
          <p>Distanță: {routeInfo.distance}</p>
          <p>Durată estimată: {routeInfo.duration}</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.slice(0, 5).map((result) => (
              <li key={result.place_id}>{result.display_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapSearch;
