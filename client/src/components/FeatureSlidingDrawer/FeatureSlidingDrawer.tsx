import { useEffect } from "react";
import { Drawer } from "@mantine/core";

export enum SlidingState {
  Hidden = "hidden",
  Default = "default",
  Full = "full",
}

interface Props {
  opened: boolean;
  onSlidingStateChanged: (state: SlidingState) => void;
  slidingState: SlidingState;
  onFeaturesMenu?: () => void;
  onClose?: () => void;
  title: string;
  children: React.ReactNode;
}

const FeatureSlidingDrawer = ({
  opened,
  onSlidingStateChanged,
  slidingState,
  title,
  children,
  onClose,
}: Props) => {
  useEffect(() => {
    if (!opened) {
      onSlidingStateChanged(SlidingState.Hidden);
    }
  }, [opened, onSlidingStateChanged]);

  const getDrawerSize = () => {
    switch (slidingState) {
      case SlidingState.Full:
        return "100%";
      case SlidingState.Default:
        return "75%";
      default:
        return 0;
    }
  };

  const handleDrawerClose = () => {
    console.log("❌ Drawer closing...");
    onSlidingStateChanged(SlidingState.Hidden);
    if (onClose) onClose();
  };

  return (
    <Drawer
      opened={opened && slidingState !== SlidingState.Hidden}
      onClose={handleDrawerClose}
      title={title}
      position="bottom"
      size={getDrawerSize()}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      withCloseButton
    >
      {children}
    </Drawer>
  );
};

export default FeatureSlidingDrawer;
