import { useState, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { Button } from "@mantine/core";

const LocateUser: React.FC<{ setUserLocation: (loc: LatLngExpression | null) => void }> = ({ setUserLocation }) => {
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

      const marker = L.marker(e.latlng).addTo(map).bindPopup("Locația ta").openPopup();
      userMarkerRef.current = marker;
    };

    map.locate({ setView: true, maxZoom: 10, watch: true });
    map.on("locationfound", onLocationFound);
    map.on("locationerror", () => {
      console.error("Nu s-a putut obține locația utilizatorului.");
    });

    return () => {
      map.stopLocate();
      map.off("locationfound", onLocationFound);
      map.off("locationerror");
      setUserLocation(null);
      if (userMarkerRef.current) {
        map.removeLayer(userMarkerRef.current);
        userMarkerRef.current = null;
      }
    };
  }, [tracking, map, setUserLocation]);

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
      <Button onClick={() => setTracking(!tracking)}>
        {tracking ? "Oprește urmărirea" : "Obține locația"}
      </Button>
    </div>
  );
};

export default LocateUser;