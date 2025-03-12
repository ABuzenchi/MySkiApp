// import Weather from "../../components/weather/weather";
// import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
// import classes from "./Sinaia.module.css";
// import sinaiaMap from "../../assets/sinaia-map.jpg";
// import sinaiaPicture01 from "../../assets/sinaia-picture01.jpg";
// import sinaiaPicture02 from "../../assets/sinaia-picture02.jpg";
// import sinaiaPicture03 from "../../assets/sinaia-picture03.jpg";
// import sinaiaPicture04 from "../../assets/sinaia-picture04.jpg";
// import { useState, useEffect } from 'react';
// import {Slope} from "../../interfaces/slope.interface"

// const images = [
//   sinaiaMap,
//   sinaiaPicture01,
//   sinaiaPicture02,
//   sinaiaPicture03,
//   sinaiaPicture04,
// ];

// export default function Sinaia() {
//   const [partii, setPartii] = useState<Slope[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchPartii();
//   }, []);

//   const fetchPartii = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/slopes/sinaia');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setPartii(data);
//       setLoading(false);
//     } catch (err:any) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className={classes.container}>
//         <Weather location="Sinaia" />
//         <CarouselPhoto images={images} />
//         </div>

//         {loading && <div>Se încarcă...</div>}

//         {error && (
//           <div>Eroare la încărcarea datelor: {error}</div>
//         )}

//         {!loading && !error && (
//           <div>
//           <h2>Slopes</h2>
//           <table className={classes.table}>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Status</th>
//                 <th>Length</th>
//                 <th>Departure altitude</th>
//               </tr>
//             </thead>
//             <tbody>
//               {partii.map((partie, index) => (
//                 <tr key={index}>
//                   <td>{partie.name}</td>
//                   <td>{partie.status}</td>
//                   <td>{partie.length}</td>
//                   <td>{partie.departureAltitude}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         )}

//     </>
//   );
// }

import { useState, useEffect } from "react";
import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Sinaia.module.css";
import sinaiaMap from "../../assets/sinaia-map.jpg";
import sinaiaPicture01 from "../../assets/sinaia-picture01.jpg";
import sinaiaPicture02 from "../../assets/sinaia-picture02.jpg";
import sinaiaPicture03 from "../../assets/sinaia-picture03.jpg";
import sinaiaPicture04 from "../../assets/sinaia-picture04.jpg";
import { Slope } from "../../interfaces/slope.interface";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { Button } from "@mantine/core";
import { FaShareAlt } from "react-icons/fa";

const images = [
  sinaiaMap,
  sinaiaPicture01,
  sinaiaPicture02,
  sinaiaPicture03,
  sinaiaPicture04,
];

export default function Sinaia() {
  const [slopes, setSlopes] = useState<Slope[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Funcție pentru a obține pârtiile din Sinaia
  useEffect(() => {
    fetch("http://localhost:3000/slopes/location/Sinaia")
      .then((response) => response.json())
      .then((data) => setSlopes(data))
      .catch((error) => console.error("Eroare la preluarea datelor: ", error));
  }, []);

  return (
    <>
      <div className={classes.slopeDetails}>
        <p >Sinaia</p>
        <Button
          variant="transparent"
          onClick={() => setIsFavorite(!isFavorite)}
          size="lg"
        >
          {isFavorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
        </Button>
        <Button variant="transparent" size="sm">
          <FaShareAlt/>
        </Button>
      </div>
      <div className={classes.container}>
        <Weather location="Sinaia" />
        <CarouselPhoto images={images} />
      </div>

      <div className={classes.slopeTable}>
        <h2>Pârtiile din Sinaia</h2>
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Lungime (m)</th>
              <th>Dificultate</th>
              <th>Lățime (m)</th>
              <th>Altitudine Bază (m)</th>
              <th>Altitudine Vârf (m)</th>
              <th>Stare</th>
            </tr>
          </thead>
          <tbody>
            {slopes.map((slope) => (
              <tr key={slope._id}>
                <td>{slope.name}</td>
                <td>{slope.length}</td>
                <td>{slope.difficulty}</td>
                <td>{slope.width}</td>
                <td>{slope.baseElevation}</td>
                <td>{slope.topElevation}</td>
                <td>{slope.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <iframe
          width="1074"
          height="604"
          src="https://www.youtube.com/embed/7wOYoWK869Q"
          title="🔴 LIVE | Webcam Ski Resort Transalpina cota 2000 | Starea Pârtiilor în Timp Real"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
