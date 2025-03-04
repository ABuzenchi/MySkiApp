import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

// Icon personalizat pentru ski
const skiIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Tipuri TypeScript
interface SkiResort {
  name: string;
  lat: number;
  lng: number;
}

// Lista pârtiilor de ski din România
const skiResorts: SkiResort[] = [
  { name: "Poiana Brașov", lat: 45.5937, lng: 25.5550 },
  { name: "Sinaia", lat: 45.3484, lng: 25.5507 },
  { name: "Straja", lat: 45.3286, lng: 23.1894 },
  { name: "Transalpina Ski", lat: 45.4024, lng: 23.6861 },
  { name: "Arena Platoș", lat: 45.6995, lng: 23.9865 }
];

// Detectează locația utilizatorului
const LocateUser: React.FC<{ setUserLocation: (loc: LatLngExpression) => void }> = ({ setUserLocation }) => {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 10 });

    map.on("locationfound", (e) => {
      setUserLocation(e.latlng);
      L.marker(e.latlng).addTo(map).bindPopup("Locația ta").openPopup();
    });

    return () => {
      map.off("locationfound");
    };
  }, [map, setUserLocation]);

  return null;
};

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);

  return (
    <MapContainer center={[45.5, 25.5]} zoom={7} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Afișează pârtiile de ski */}
      {skiResorts.map((resort, index) => (
        <Marker key={index} position={[resort.lat, resort.lng]} icon={skiIcon}>
          <Popup>{resort.name}</Popup>
        </Marker>
      ))}

      {/* Detectează locația utilizatorului */}
      <LocateUser setUserLocation={setUserLocation} />
    </MapContainer>
  );
};

export default MapComponent;
