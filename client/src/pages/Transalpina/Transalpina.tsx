import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Transalpina.module.css";
import transalpinaMap from "../../assets/transalpina-map.jpg";
import transalpinaPicture01 from "../../assets/transalpina-picture01.jpg";
import transalpinaPicture02 from "../../assets/transalpina-picture02.jpg";
import transalpinaPicture03 from "../../assets/transalpina-picture03.jpg";
import transalpinaPicture04 from "../../assets/transalpina-picture04.png";

const images = [
  transalpinaMap,
  transalpinaPicture01,
  transalpinaPicture02,
  transalpinaPicture03,
  transalpinaPicture04,
];
export default function Transalpina() {
  return (
    <>
      <div className={classes.container}>
        <Weather location="Voineasa" />
        <CarouselPhoto images={images} />
      </div>
    </>
  );
}
