import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { SkiResort } from "../../interfaces/skiResort.interface";
import pin from "../../assets/pin.png";
import { Modal } from "@mantine/core";
import { MdFullscreen } from "react-icons/md";
import userLocation from "../userLocation/userLocation";

const skiIcon = new L.Icon({
  iconUrl: pin,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const DEFAULT_CENTER: [number, number] = [45.9432, 24.9668];
const DEFAULT_ZOOM = 7;

const MapComponent = () => {
  const [skiResorts, setSkiResorts] = useState<SkiResort[]>([]);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/ski-domains/map")
      .then((res) => res.json())
      .then((data) => setSkiResorts(data))
      .catch(console.error);
  }, []);

  const renderMap = (fullscreen = false) => (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{
        width: "100%",
        height: fullscreen ? "100vh" : "500px",
      }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; <a href="https://carto.com/">CARTO</a>'
      />

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
    </MapContainer>
  );

 

  return (
  <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}>
    {/* Arată harta normală doar când modalul NU este deschis */}
    {!modalOpened && renderMap()}

    {/* Buton de fullscreen (vizibil DOAR când harta normală e activă) */}
    {!modalOpened && (
      <button
        onClick={() => setModalOpened(true)}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          border: "none",
          borderRadius: "50%",
          width: 42,
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1000,
          transition: "opacity 0.3s ease",
          opacity: 0.85,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
      >
        <MdFullscreen color="white" size={22} />
      </button>
    )}

    {/* Modal cu hartă fullscreen */}
    <Modal
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      fullScreen
      withCloseButton={false}
      padding={0}
      styles={{ body: { padding: 0 } }}
    >
      {renderMap(true)}
    </Modal>
  </div>
);

};

export default MapComponent;
