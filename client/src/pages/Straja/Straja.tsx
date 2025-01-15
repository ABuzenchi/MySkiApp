import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Straja.module.css";
import strajaMap from "../../assets/straja-map.jpg";
import strajaPicture01 from "../../assets/straja-picture01.jpg";
import strajaPicture02 from "../../assets/straja-picture02.jpg";
import strajaPicture03 from "../../assets/straja-picture03.jpg";
import strajaPicture04 from "../../assets/straja-picture-04.jpg";

const images = [
    strajaMap,
    strajaPicture01,
    strajaPicture02,
    strajaPicture03,
    strajaPicture04,
];
export default function Straja() {
  return (
    <>
      <div className={classes.container}>
        <Weather location="Straja" />
        <CarouselPhoto images={images} />
       </div>
    </>
  );
}
