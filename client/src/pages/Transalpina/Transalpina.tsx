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
import SlopeFilter from "../../components/slope-filter/slope-filter";
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
        <SlopeFilter slopes={slopes} />
      </div>
      <div>
      <iframe width="972" height="546" src="https://www.youtube.com/embed/S4-J13OMpRA" title="🔴 LIVE | Webcam Ski Resort Transalpina | Starea Pârtiilor în Timp Real" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>

    </>
  );
}
