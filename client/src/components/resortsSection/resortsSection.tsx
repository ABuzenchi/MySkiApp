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
      <div className={classes.cardsContainer}>
        {resorts.map((resort) => (
          <Link to={`/${resort.name}`} key={resort.name} className={classes.cardLink}>
            <Card shadow="md" radius="md"  withBorder  classNames={{ root: classes.card }}>
             <img src={resort.imageUrl} alt={resort.name} />
              <Text className={classes.name}>{resort.name}</Text>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResortsSection;
