import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Transalpina.module.css";
import transalpinaMap from "../../assets/transalpina-map.jpg";
import transalpinaPicture01 from "../../assets/transalpina-picture01.jpg";
import transalpinaPicture02 from "../../assets/transalpina-picture02.jpg";
import transalpinaPicture03 from "../../assets/transalpina-picture03.jpg";
import transalpinaPicture04 from "../../assets/transalpina-picture04.png";
import SlopeStatus from "../../components/slope-status/slope-status";
import { useEffect, useState } from "react";
import { Slope } from "../../interfaces/slope.interface";
const images = [
  transalpinaMap,
  transalpinaPicture01,
  transalpinaPicture02,
  transalpinaPicture03,
  transalpinaPicture04,
];
export default function Transalpina() {
   const [slopes, setSlopes] = useState<Slope[]>([]);
     
    
      useEffect(() => {
        fetch("http://localhost:3000/slopes/location/Transalpina")
          .then((response) => response.json())
          .then((data) => setSlopes(data))
          .catch((error) => console.error("Eroare la preluarea datelor: ", error));
      }, []);
  return (
    <>
    <SlopeStatus name="Transalpina" />
      <div className={classes.container}>
        <Weather location="Voineasa" />
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
      <iframe width="972" height="546" src="https://www.youtube.com/embed/S4-J13OMpRA" title="🔴 LIVE | Webcam Ski Resort Transalpina | Starea Pârtiilor în Timp Real" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

    </>
  );
}
