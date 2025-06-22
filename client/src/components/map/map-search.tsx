import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDistanceAndDuration } from "../../utils/getDistanceAndDuration";
import LocateUser from "../userLocation/userLocation";

function toTuple(loc: LatLngExpression): [number, number] {
  if (Array.isArray(loc)) {
    const [lat, lng] = loc;
    return [lat, lng];
  }
  if ("lat" in loc && "lng" in loc) return [loc.lat, loc.lng];
  throw new Error("Coordonatele nu sunt într-un format valid");
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

const MapSearch = ({ domain }: { domain: { lat: number; lng: number; name: string } }) => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const [routeLine, setRouteLine] = useState<LatLngExpression[] | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);

  if (!domain || typeof domain.lat !== "number" || typeof domain.lng !== "number") {
    return <p>Harta nu poate fi afișată: coordonate lipsă.</p>;
  }

  const destination: LatLngExpression = [domain.lat, domain.lng];

  useEffect(() => {
    if (userLocation) {
      const start = toTuple(userLocation);
      const end = toTuple(destination);

      getDistanceAndDuration([start[1], start[0]], [end[1], end[0]])
        .then((info) => {
          setRouteInfo({ distance: info.distance, duration: info.duration });
          setRouteLine(info.geometry);
          console.log("Start:", start, "End:", end);

        })
        .catch(console.error);
    }
  }, [userLocation, destination]);
 useEffect(() => {
  console.log("userLocation actualizată:", userLocation);
}, [userLocation]);

  return (
    <div>
      <MapContainer center={destination} zoom={10} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocateUser setUserLocation={setUserLocation} />
        <ChangeView center={destination} zoom={10} />

        <Marker position={destination} icon={skiIcon}>
          <Popup>{domain.name}</Popup>
        </Marker>

        {routeLine && <Polyline positions={routeLine} color="blue" />}
      </MapContainer>

      {routeInfo && (
        <div style={{ marginTop: "20px" }}>
          <h3>Informații rută:</h3>
          <p>Distanță: {routeInfo.distance}</p>
          <p>Durată estimată: {routeInfo.duration}</p>
        </div>
      )}
    </div>
  );
};

export default MapSearch;
