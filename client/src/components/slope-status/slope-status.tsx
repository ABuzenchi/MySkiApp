// src/components/slopeStatus/SlopeStatus.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { updateSlopes } from "../../store/updateSlopes";
import classes from "./slope-status.module.css";
import { Button } from "@mantine/core";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import ShareModal from "../shareModal/shareModal";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";

interface SlopeStatusProps {
  name: string;
}

const SlopeStatus = ({ name }: SlopeStatusProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { favoriteSlopes, visitedSlopes, username } = useSelector(
    (state: RootState) => state.auth
  );

  const isFavorite = favoriteSlopes.includes(name);
  const isVisited = visitedSlopes.includes(name);

  const handleFavoriteToggle = () => {
    const updatedFavorites = isFavorite
      ? favoriteSlopes.filter((slope) => slope !== name)
      : [...favoriteSlopes, name];

    dispatch(updateSlopes({
      username: username!,
      favoriteSlopes: updatedFavorites,
      visitedSlopes: visitedSlopes // trimite și vizitatele existente
    }));
  };

  const handleVisitedToggle = () => {
    if (!isVisited) {
      const updatedVisited = [...visitedSlopes, name];

      dispatch(updateSlopes({
        username: username!,
        favoriteSlopes: favoriteSlopes, // trimite și favoritele existente
        visitedSlopes: updatedVisited
      }));
    }
  };

  return (
    <div className={classes.slopeDetails}>
      <p>{name}</p>
      <Button
        variant="transparent"
        onClick={handleFavoriteToggle}
        size="lg"
      >
        {isFavorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
      </Button>
      <ShareModal />
      <Button
        variant="transparent"
        onClick={handleVisitedToggle}
        size="sm"
      >
        {isVisited ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
      </Button>
    </div>
  );
};

export default SlopeStatus;
