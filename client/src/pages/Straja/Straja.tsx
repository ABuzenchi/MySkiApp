import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Straja.module.css";
import strajaMap from "../../assets/straja-map.jpg";
import strajaPicture01 from "../../assets/straja-picture01.jpg";
import strajaPicture02 from "../../assets/straja-picture02.jpg";
import strajaPicture03 from "../../assets/straja-picture03.jpg";
import strajaPicture04 from "../../assets/straja-picture-04.jpg";
import SlopeStatus from "../../components/slope-status/slope-status";
import { useEffect, useState } from "react";
import { Slope } from "../../interfaces/slope.interface";

const images = [
  strajaMap,
  strajaPicture01,
  strajaPicture02,
  strajaPicture03,
  strajaPicture04,
];
export default function Straja() {
  const [slopes, setSlopes] = useState<Slope[]>([]);
   
  
    useEffect(() => {
      fetch("http://localhost:3000/slopes/location/Straja")
        .then((response) => response.json())
        .then((data) => setSlopes(data))
        .catch((error) => console.error("Eroare la preluarea datelor: ", error));
    }, []);
    
  return (
    <>
    <SlopeStatus name="Straja" />
      <div className={classes.container}>
        <Weather location="Straja" />
        <CarouselPhoto images={images} />
      </div>
      <div className={classes.slopeTable}>
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
      <iframe width="775" height="436" src="https://www.youtube.com/embed/hB9f4Gpdtwc" title="Starea Pârtiilor din România ⛷️🏔️ - 4 Martie 2025" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
