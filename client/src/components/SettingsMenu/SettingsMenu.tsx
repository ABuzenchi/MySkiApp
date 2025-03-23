import { Modal, Button } from "@mantine/core";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAvatar } from "../../store/authSlice";
import {EnDictionary } from "../../dictionaries/en";

const SettingsMenu = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.auth);

  const handleImageSelect = async (imageUrl: string | null) => {
    if (!username || !imageUrl) return;
  
    try {
      const response = await fetch(`http://localhost:3000/auth/${username}/avatar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profilePicture: imageUrl }),
      });
  
      const data = await response.json();
      dispatch(setAvatar(data.profilePicture));
      localStorage.setItem(`userAvatar_${username}`, data.profilePicture);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };
  

  return (
    <>
      <Button
        variant="transparent"
        color="black"
        onClick={() => setOpened(true)}
        size="sm"
      >
        <IoIosSettings />
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={EnDictionary.ProfileSettings}
        withinPortal={false}
      >
        <div>
          <ImageUploader onImageSelect={handleImageSelect} />
        </div>
      </Modal>
    </>
  );
};

export default SettingsMenu;
