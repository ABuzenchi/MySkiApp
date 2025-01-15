import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Sinaia.module.css";
import sinaiaMap from "../../assets/sinaia-map.jpg";
import sinaiaPicture01 from "../../assets/sinaia-picture01.jpg";
import sinaiaPicture02 from "../../assets/sinaia-picture02.jpg";
import sinaiaPicture03 from "../../assets/sinaia-picture03.jpg";
import sinaiaPicture04 from "../../assets/sinaia-picture04.jpg";

const images = [
  sinaiaMap,
  sinaiaPicture01,
  sinaiaPicture02,
  sinaiaPicture03,
  sinaiaPicture04,
];
export default function Sinaia() {
  return (
    <>
      <div className={classes.container}>
        <Weather location="Sinaia" />
        <CarouselPhoto images={images} />
      </div>
    </>
  );
}
