import Weather from "../../components/weather/weather";
import CarouselPhoto from "../../components/carousel-photo/carousel-photo";
import classes from "./Poiana-Brasov.module.css";

const PoianaBrasov = () => {
  return (
    <>
      <div className={classes.container}>
        <Weather location="Brasov" />
        <CarouselPhoto />
      </div>
    </>
  );
};

export default PoianaBrasov;
