import { useState, useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { LatLngExpression, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDistanceAndDuration } from "../../utils/getDistanceAndDuration";
import { areLocationsEqual } from "../../utils/compareCoords"; // ✅ import funcția
import LocateUser from "../userLocation/userLocation";
import RouteInfoCard from "./routeCardInfo";
import { Loader } from "@mantine/core";

// 📌 Funcție utilă
function toTuple(loc: LatLngExpression): [number, number] {
  if (Array.isArray(loc)) return [loc[0], loc[1]];
  if ("lat" in loc && "lng" in loc) return [loc.lat, loc.lng];
  throw new Error("Coordonatele nu sunt într-un format valid");
}

const skiIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function FitToRouteBounds({ route }: { route: LatLngExpression[] }) {
  const map = useMap();

  useEffect(() => {
    if (route.length > 1) {
      const bounds = new LatLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, map]);

  return null;
}

const MapSearch = ({
  domain,
}: {
  domain: { lat: number; lng: number; name: string };
}) => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const [routeLine, setRouteLine] = useState<LatLngExpression[] | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  const previousLocation = useRef<LatLngExpression | null>(null); // ✅

  const destination = useMemo<LatLngExpression>(
    () => [domain.lat, domain.lng],
    [domain.lat, domain.lng]
  );

  useEffect(() => {
    if (userLocation) {
      // ✅ Evită apeluri duplicate
      if (
        previousLocation.current &&
        areLocationsEqual(userLocation, previousLocation.current)
      ) {
        return;
      }

      previousLocation.current = userLocation;

      const start = toTuple(userLocation);
      const end = toTuple(destination);
      setIsLoadingRoute(true);

      getDistanceAndDuration([start[1], start[0]], [end[1], end[0]])
        .then((info) => {
          setRouteInfo({ distance: info.distance, duration: info.duration });
          setRouteLine(info.geometry);
        })
        .catch(console.error)
        .finally(() => setIsLoadingRoute(false));
    }
  }, [userLocation, destination]);

  if (!domain || typeof domain.lat !== "number" || typeof domain.lng !== "number") {
    return <p>Harta nu poate fi afișată: coordonate lipsă.</p>;
  }
useEffect(() => {
  if (userLocation === null) {
    setRouteLine(null);
    setRouteInfo(null);
  }
}, [userLocation]);

  return (
    <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}>
      {isLoadingRoute && (
        <div
          style={{
            position: "absolute",
            zIndex: 999,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(2px)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Loader size="lg" color="blue" />
            <div style={{ marginTop: 10, fontSize: 14 }}>Se calculează ruta...</div>
          </div>
        </div>
      )}

      <MapContainer center={destination} zoom={10} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; <a href="https://carto.com/">CARTO</a>'
        />

        <LocateUser setUserLocation={setUserLocation} />

        <Marker position={destination} icon={skiIcon}>
          <Popup>{domain.name}</Popup>
        </Marker>

        {routeLine && (
          <>
            <Polyline positions={routeLine} color="blue" />
            <FitToRouteBounds route={routeLine} />
          </>
        )}
      </MapContainer>

      {routeInfo && (
        <RouteInfoCard distance={routeInfo.distance} duration={routeInfo.duration} />
      )}
    </div>
  );
};

export default MapSearch;
