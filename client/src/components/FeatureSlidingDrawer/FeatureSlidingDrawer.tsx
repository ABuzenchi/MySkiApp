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
    } else if (slidingState === SlidingState.Hidden) {
      onSlidingStateChanged(SlidingState.Default); // sau .Full dacă preferi fullscreen
    }
  }, [opened, slidingState, onSlidingStateChanged]);

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
    <>
      {/* Debug temporar - șterge după testare */}
      {/* 
      <div style={{ position: "fixed", top: 0, left: 0, background: "yellow", zIndex: 99999 }}>
        🔍 Drawer opened: {String(opened)} | State: {slidingState}
      </div>
      */}

      <Drawer
        opened={opened && slidingState !== SlidingState.Hidden}
        onClose={handleDrawerClose}
        title={title}
        position="bottom"
        size={getDrawerSize()}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        withCloseButton
        styles={{
          body: {
            overflowY: "auto",
            maxHeight: "calc(100vh - 100px)",
            paddingBottom: "2rem",
          },
        }}
      >
        {children}
      </Drawer>
    </>
  );
};

export default FeatureSlidingDrawer;
