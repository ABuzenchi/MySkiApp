// FeatureDrawer.tsx
import { Drawer } from "@mantine/core";

interface Props {
  opened: boolean;
  onClose: () => void;
  onFeaturesMenu?: () => void;
  title: string;
  children: React.ReactNode;
}

const FeatureDrawer = ({ opened, onClose, title, children }: Props) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={title}
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      size="md"
    >
      {children}
    </Drawer>
  );
};

export default FeatureDrawer;
