import { Avatar, Rating, Text, Group } from "@mantine/core";
import classes from "./reviews.module.css";

interface ReviewCardInterface{
    rating:number,
    comment:string,
    userName:string,
    avatarUrl:string

}
export const ReviewCard = ({ rating, comment, userName, avatarUrl }:ReviewCardInterface) => {
  return (
    <div className={classes.card}>
      <Rating value={rating} readOnly size="sm" />
      <Text className={classes.comment} size="sm">
        "{comment}"
      </Text>
      <Group >
        <Avatar src={avatarUrl} radius="xl" />
        <Text>{userName}</Text>
      </Group>
    </div>
  );
};
