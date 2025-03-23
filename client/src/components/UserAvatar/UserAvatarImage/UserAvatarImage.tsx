import { Avatar } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAvatar } from "../../../store/authSlice";
import { EnDictionary } from "../../../dictionaries/en";

interface UserAvatarImageProps {
  username: string | null;
  size:string;
}

const UserAvatarImage = ({ username,size}: UserAvatarImageProps) => {
  const dispatch = useDispatch();
  const { profilePicture } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const savedImage = localStorage.getItem(`userAvatar_${username}`);
    if (savedImage && savedImage !== profilePicture) {
      dispatch(setAvatar(savedImage));
    }
  }, [dispatch, username, profilePicture]);

  return (
    <Avatar color="pink" src={profilePicture} alt={EnDictionary.ProfilePicture} size={size} />
  );
};

export default UserAvatarImage;
