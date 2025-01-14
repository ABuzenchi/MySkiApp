import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { Image } from "@mantine/core";
import classes from "./carousel-photo.module.css";


interface CarouselPhotosProps {
 images: string[];
}

const CarouselPhoto = ({images}:CarouselPhotosProps) => {
  const slides = images.map((url) => (
    <Carousel.Slide key={url} className={classes.container}>
      <Image src={url} className={classes.carouselimage} />
    </Carousel.Slide>
  ));

  return <Carousel withIndicators>{slides}</Carousel>;
};

export default CarouselPhoto;
