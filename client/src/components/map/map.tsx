import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { SkiResort } from "../../interfaces/skiResort.interface";
import UserLocation from "../userLocation/userLocation";

const skiIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = () => {
  const [skiResorts, setSkiResorts] = useState<SkiResort[]>([]);
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/ski-domains/map")
      .then((res) => res.json())
      .then((data) => setSkiResorts(data))
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={[45.5, 25.5]}
      zoom={7}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {skiResorts.map((resort, index) => (
        <Marker key={index} position={[resort.lat, resort.lng]} icon={skiIcon}>
          <Popup minWidth={300} maxWidth={300}>
            <iframe
              src={`https://ro.m.wikipedia.org/wiki/${encodeURIComponent(resort.name)}`}
              width="100%"
              height="250"
              style={{ border: "none" }}
              title={`Wikipedia - ${resort.name}`}
              loading="lazy"
            />
          </Popup>
        </Marker>
      ))}

      <UserLocation setUserLocation={setUserLocation} />
    </MapContainer>
  );
};

export default MapComponent;
