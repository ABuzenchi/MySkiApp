import ImageUploader from "../ImageUploader/ImageUploader";
import { Stack, Text } from "@mantine/core";

interface SettingsMenuProps {
  onImageSelect: (image: string | null) => void;
}

const SettingsMenu = ({ onImageSelect }: SettingsMenuProps) => {
  return (
    <Stack>
      <Text size="lg" >
        Setări profil
      </Text>
      <ImageUploader onImageSelect={onImageSelect} />
    </Stack>
  );
};

export default SettingsMenu;
