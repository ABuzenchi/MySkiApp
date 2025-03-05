import SettingsMenu from "../SettingsMenu/SettingsMenu";
import classes from "./UserAvatar.module.css";
import UserAvatarImage from "./UserAvatarImage/UserAvatarImage";

interface UserAvatarProps {
  username: string | null;
}

const UserAvatar = ({ username }: UserAvatarProps) => {
  return (
    <div className={classes.container}>
      <SettingsMenu />
      <div className={classes.infoUser}>
        <UserAvatarImage username={username} size="xl" />
        <p className={classes.username}>{username}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
