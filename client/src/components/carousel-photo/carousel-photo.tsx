import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Image } from "@mantine/core";
import classes from "./carousel-photo.module.css";
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
const CarouselPhoto = () => {
  const slides = images.map((url) => (
    <Carousel.Slide key={url} className={classes.container}>
      <Image src={url} className={classes.carouselimage} />
    </Carousel.Slide>
  ));

  return <Carousel withIndicators>{slides}</Carousel>;
};

export default CarouselPhoto;
