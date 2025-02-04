import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Poiana-Brasov.module.css";
import PostavaruMap from "../../assets/postavaru-map.jpg";
import PoianaBrasovPicture01 from "../../assets/PoianaBrasovPicture01.jpg";
import PoianaBrasovPicture02 from "../../assets/PoianaBrasovPicture02.jpg";
import PoianaBrasovPicture03 from "../../assets/PoianaBrasovPicture03.jpg";
import PoianaBrasovPicture04 from "../../assets/PoianaBrasovPicture04.jpeg";
import RatingResort from "../../components/rating/rating";

const images = [
  PostavaruMap,
  PoianaBrasovPicture01,
  PoianaBrasovPicture02,
  PoianaBrasovPicture03,
  PoianaBrasovPicture04,
];

const PoianaBrasov = () => {
  return (
    <>
      <div className={classes.container}>
        <Weather location="Brasov" />
        <CarouselPhoto images={images} />
      </div>
      <RatingResort></RatingResort>
    </>
  );
};

export default PoianaBrasov;
