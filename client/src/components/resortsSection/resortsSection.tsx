import { Carousel } from "@mantine/carousel";
import { Text, Card, Center, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./resorts.module.css";
import useDevice, { DeviceTypes } from "../../hooks/useDevice";

interface SkiDomain {
  name: string;
  imageUrl: string;
}

interface Props {
  resorts: SkiDomain[];
}

const ResortsSection = ({ resorts }: Props) => {
  const { device } = useDevice();

  // Slide size & spacing responsive
  let slideSize = "220px";
  let slideGap: "sm" | "md" = "md";

  if (device === DeviceTypes.Mobile) {
    slideSize = "45%";
    slideGap = "sm";
  }
  if (device === DeviceTypes.MobilePortrait) {
    slideSize = "60%";
    slideGap = "sm";
  }

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
  slideSize={slideSize}
  slideGap={slideGap}
  align="start"
  containScroll="trimSnaps"
  withIndicators
  loop
  height={260}
  classNames={{
    indicators: classes.indicators,
    indicator: classes.indicator,
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
