import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteSlopes, addVisitedSlopes, removeFavoriteSlope } from "../../store/authSlice";
import { RootState } from "../../store";
import classes from "./slope-status.module.css"
import { Button } from "@mantine/core";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import ShareModal from "../shareModal/shareModal";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";

interface SlopeStatusProps{
    name:string;
}

const SlopeStatus = ({name}:SlopeStatusProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const dispatch = useDispatch();
    const { favoriteSlopes, visitedSlopes } = useSelector(
       (state: RootState) => state.auth
     );

     const handleFavoriteToggle = (slopeName: string) => {
         if (favoriteSlopes.includes(slopeName)) {
           dispatch(removeFavoriteSlope(slopeName)); 
           setIsFavorite(false);
         } else {
           dispatch(addFavoriteSlopes(slopeName)); 
           setIsFavorite(true);
         }
       };
     
       const handleVisitedToggle = (slopeName: string) => {
         if (visitedSlopes.includes(slopeName)) {
          //nothing
         } else {
           dispatch(addVisitedSlopes(slopeName)); 
           setIsVisited(true);
         }
       };

    return(
        <div className={classes.slopeDetails}>
        <p>{name}</p>
        <Button
          variant="transparent"
          onClick={() => handleFavoriteToggle(name)}
          size="lg"
        >
          {isFavorite ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
        </Button>
        <ShareModal/>
        <Button
          variant="transparent"
          onClick={() => handleVisitedToggle(name)}
          size="sm"
        >
           {isVisited ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
        </Button>
      </div>
    )
     
};

export default SlopeStatus;
