// UserAvatarImage.tsx

import { Avatar } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { EnDictionary } from "../../../dictionaries/en";

interface UserAvatarImageProps {
  username: string | null;
  size: string;
}

const UserAvatarImage = ({ size }: UserAvatarImageProps) => {
  const { profilePicture } = useSelector((state: RootState) => state.auth);

  return (
    <Avatar
      color="pink"
      src={profilePicture || undefined}
      alt={EnDictionary.ProfilePicture}
      size={size}
    />
  );
};

export default UserAvatarImage;
