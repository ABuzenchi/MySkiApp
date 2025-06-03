import { Carousel } from "@mantine/carousel";
import { Text, Card } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./resorts.module.css";

interface SkiDomain {
  name: string;
  imageUrl: string;
}

interface Props {
  resorts: SkiDomain[];
}

const ResortsSection = ({ resorts }: Props) => {
  return (
    <div className={classes.wrapper}>
      <Carousel
        slideSize="220px"
        slideGap="md"
        align="start"
        containScroll="trimSnaps"
        withIndicators
        loop
        height={260}
        styles={{
          indicators: {
            marginTop: 32, // sau 32 dacă vrei mai mult spațiu
          },
          indicator: {
            width: 8,
            height: 8,
            transition: "opacity 0.3s ease",
            background: "#fff",
            opacity: 0.5,
            "&[data-active]": {
              opacity: 1,
            },
          },
        }}
      >
        {resorts.map((resort) => (
          <Carousel.Slide key={resort.name}>
            <Link
              to={`/resorts/${encodeURIComponent(resort.name)}`}
              className={classes.cardLink}
            >
              <Card
                shadow="md"
                radius="md"
                withBorder
                classNames={{ root: classes.card }}
              >
                <img src={resort.imageUrl} alt={resort.name} />
                <Text className={classes.name}>{resort.name}</Text>
              </Card>
            </Link>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default ResortsSection;
