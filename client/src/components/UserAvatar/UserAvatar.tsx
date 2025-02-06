import { useState } from "react";
import { Avatar, Button, Drawer, Modal } from "@mantine/core";
import SettingsMenu from "../SettingsMenu/SettingsMenu";

const UserAvatar = () => {
  const [image, setImage] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Avatar color="pink" src={image} alt="Profile picture" size="lg" />
      <Button onClick={() => setOpened(true)}>Setări</Button>

      {/* Meniu de setări */}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Setări"  withinPortal={false}>
        <SettingsMenu onImageSelect={setImage} />
      </Modal>
    </>
  );
};

export default UserAvatar;
