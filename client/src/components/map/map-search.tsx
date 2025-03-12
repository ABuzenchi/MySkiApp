import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression, Map } from 'leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

function ChangeView({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([45.5, 25.5]);
  const [selectedLocation, setSelectedLocation] = useState<LatLngExpression | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data: SearchResult[] = await response.json();
      setSearchResults(data);
      
      if (data.length > 0) {
        const firstResult = data[0];
        const newCenter: LatLngExpression = [
          parseFloat(firstResult.lat), 
          parseFloat(firstResult.lon)
        ];
        setMapCenter(newCenter);
        setSelectedLocation(newCenter);
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
    }
  };

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
      </MapContainer>

      {searchResults.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.slice(0, 5).map((result) => (
              <li key={result.place_id}>
                {result.display_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapSearch;