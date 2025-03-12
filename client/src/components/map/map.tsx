import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

const skiResorts: SkiResort[] = [
  { name: "Poiana Brașov", lat: 45.5937, lng: 25.555 },
  { name: "Sinaia", lat: 45.3484, lng: 25.5507 },
  { name: "Straja", lat: 45.3286, lng: 23.1894 },
  { name: "Transalpina Ski", lat: 45.4024, lng: 23.6861 },
  { name: "Arena Platoș", lat: 45.6995, lng: 23.9865 },
  { name: "Busteni", lat: 45.41700744628906, lng: 25.521366119384766 },
  { name: "Azuga", lat: 45.442806243896484, lng: 25.589309692382812 },
  { name: "Predeal", lat: 45.484092712402344, lng: 25.591073989868164 },
  { name: "Paltinis", lat: 45.675201416015625, lng: 23.935401916503906 },
  { name: "Vatra Dornei", lat: 47.346927642822266, lng: 25.355764389038086 },
  { name: "Baisoara", lat: 46.577552795410156, lng: 23.461515426635742 },
  {
    name: "Harghita Madaras",
    lat: 46.453128814697266,
    lng: 25.582042694091797,
  },
  { name: "Ranca", lat: 45.3052978515625, lng: 23.685272216796875 },
  { name: "Cavnic", lat: 47.660602, lng: 23.879175 },
  { name: "Suior", lat: 47.67308807373047, lng: 23.778383255004883 },
  { name: "Izvoare", lat: 47.75117874145508, lng: 23.719257354736328 },
  { name: "Borsa", lat: 47.615257263183594, lng: 24.784509658813477 },
  { name: "Carlibaba", lat: 47.571285, lng: 25.116971 },
  { name: "Valea Blaznei", lat: 47.466948, lng: 24.899998 },
  { name: "Gura Humorului", lat: 47.552462, lng: 25.885284 },
];

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(
    null
  );

  return (
    <MapContainer
      center={[45.5, 25.5]}
      zoom={7}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {skiResorts.map((resort, index) => (
        <Marker key={index} position={[resort.lat, resort.lng]} icon={skiIcon}>
          <Popup>{resort.name}</Popup>
        </Marker>
      ))}

      <UserLocation setUserLocation={setUserLocation} />
    </MapContainer>
  );
};

export default MapComponent;
