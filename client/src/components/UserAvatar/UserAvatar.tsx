import { Avatar } from "@mantine/core";
import { useEffect } from "react";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import classes from "./UserAvatar.module.css";
import { setAvatar } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Dictionary } from "../../dictionaries/en";
interface UserAvatarInterface {
  username: string | null;
}
const UserAvatar = ({ username }: UserAvatarInterface) => {
 
  const dispatch = useDispatch();
  const { avatar } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const savedImage = localStorage.getItem(`userAvatar_${username}`);
    if (savedImage && savedImage !== avatar) {
      dispatch(setAvatar(savedImage));  
    }
  }, [dispatch, username, avatar]);

  return (
    <div className={classes.container}>
      <SettingsMenu  />
      <div className={classes.infoUser}>
        <Avatar color="pink" src={avatar} alt={Dictionary.ProfilePicture} size="xl" />
        <p className={classes.username}>{username}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
