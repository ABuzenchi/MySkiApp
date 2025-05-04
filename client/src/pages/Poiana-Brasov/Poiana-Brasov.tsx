import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Poiana-Brasov.module.css";
import PostavaruMap from "../../assets/postavaru-map.jpg";
import PoianaBrasovPicture01 from "../../assets/PoianaBrasovPicture01.jpg";
import PoianaBrasovPicture02 from "../../assets/PoianaBrasovPicture02.jpg";
import PoianaBrasovPicture03 from "../../assets/PoianaBrasovPicture03.jpg";
import PoianaBrasovPicture04 from "../../assets/PoianaBrasovPicture04.jpeg";
import RatingResort from "../../components/rating/rating";
import MapSearch from "../../components/map/map-search";
import SlopeStatus from "../../components/slope-status/slope-status";
import { useEffect, useState } from "react";
import { Slope } from "../../interfaces/slope.interface";

const images = [
  PostavaruMap,
  PoianaBrasovPicture01,
  PoianaBrasovPicture02,
  PoianaBrasovPicture03,
  PoianaBrasovPicture04,
];

const PoianaBrasov = () => {
   const [slopes, setSlopes] = useState<Slope[]>([]);
       
      
        useEffect(() => {
          fetch("http://localhost:3000/slopes/location/Poiana Brașov")
            .then((response) => response.json())
            .then((data) => setSlopes(data))
            .catch((error) => console.error("Eroare la preluarea datelor: ", error));
        }, []);
  return (
    <>
    <SlopeStatus name="Poiana Brasov"/>
      <div className={classes.container}>
        <Weather location="Brasov" />
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
      <RatingResort></RatingResort>
      <div>
      <iframe width="1074" height="604" src="https://www.youtube.com/embed/Ifw-41CDRjQ" title="🔴 LIVE | Webcam Poiana Brașov - Gondola Postăvaru | Starea Pârtiilor în Timp Real" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
      <div>
        <MapSearch/>
      </div>
    </>
  );
};

export default PoianaBrasov;