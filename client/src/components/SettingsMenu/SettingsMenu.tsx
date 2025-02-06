import { Modal, Button } from "@mantine/core";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAvatar } from "../../store/authSlice";

const SettingsMenu = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.auth);

  const handleImageSelect = (image: string | null) => {
    if (image && username) {
      dispatch(setAvatar(image));
      localStorage.setItem(`userAvatar_${username}`, image);
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
        title="Setări profil"
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
