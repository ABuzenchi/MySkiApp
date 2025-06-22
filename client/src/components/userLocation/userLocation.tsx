import { useState, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { ActionIcon, Tooltip } from "@mantine/core";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

const LocateUser: React.FC<{ setUserLocation: (loc: LatLngExpression | null) => void }> = ({
  setUserLocation,
}) => {
  const map = useMap();
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!tracking) return;

    const onLocationFound = (e: L.LocationEvent) => {
      setUserLocation(e.latlng);
      console.log("Locația utilizatorului:", e.latlng);

      if (userMarkerRef.current) {
        map.removeLayer(userMarkerRef.current);
      }

      const marker = L.marker(e.latlng)
        .addTo(map)
        .bindPopup("Locația ta")
        .openPopup();

      userMarkerRef.current = marker;
      map.setView(e.latlng, map.getZoom());
    };

    const onLocationError = () => {
      console.error("Nu s-a putut obține locația utilizatorului.");
    };

    map.locate({ setView: false, watch: true, maxZoom: 16 });
    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    return () => {
      map.stopLocate();
      map.off("locationfound", onLocationFound);
      map.off("locationerror", onLocationError);
      setUserLocation(null);
      if (userMarkerRef.current) {
        map.removeLayer(userMarkerRef.current);
        userMarkerRef.current = null;
      }
    };
  }, [tracking, map, setUserLocation]);

  return (
    <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 1000 }}>
      <Tooltip
        label={tracking ? "Oprește urmărirea" : "Obține locația"}
        position="left"
        withArrow
        transitionProps={{ duration: 150 }}
      >
        <ActionIcon
          variant="filled"
          color={tracking ? "red" : "blue"}
          radius="xl"
          size="xl"
          onClick={() => setTracking((prev) => !prev)}
        >
          {tracking ? <FaTimes size={20} /> : <FaLocationArrow size={20} />}
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

export default LocateUser;
