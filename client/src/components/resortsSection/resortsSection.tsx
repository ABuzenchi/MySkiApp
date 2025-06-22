import { Carousel } from "@mantine/carousel";
import { Text, Card, Center, Loader } from "@mantine/core";
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
  
  if (!resorts || resorts.length === 0) {
    return (
      <Center style={{ height: 260 }}>
        <Loader size="lg" color="blue" />
      </Center>
    );
  }
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
        styles={(theme) => ({
          indicators: {
            marginTop: 32,
            justifyContent: "center",
          },
          indicator: {
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.5)",
            border: "1px solid white",
            transition: "all 0.3s ease",
            "&[data-active]": {
              backgroundColor: "white",
              transform: "scale(1.4)",
              boxShadow: "0 0 6px white",
            },
            "&:hover": {
              background: "white",
              opacity: 0.8,
            },
          },
        })}
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
