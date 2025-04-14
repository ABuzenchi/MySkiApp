// use-device.ts
import { useEffect, useState } from "react";

export enum DeviceTypes {
  Desktop = "desktop",
  Tablet = "tablet",
  Mobile = "mobile",
  MobilePortrait = "mobilePortrait",
}

const getDeviceType = () => {
  const width = window.innerWidth;

  if (width <= 480) return DeviceTypes.MobilePortrait;
  if (width <= 768) return DeviceTypes.Mobile;
  if (width <= 1024) return DeviceTypes.Tablet;
  return DeviceTypes.Desktop;
};

const useDevice = () => {
  const [device, setDevice] = useState<DeviceTypes>(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { device };
};

export default useDevice;
