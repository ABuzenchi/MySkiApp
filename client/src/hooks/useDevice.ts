import { useEffect, useState } from "react";

export enum DeviceTypes {
  Mobile = "mobile",
  Desktop = "desktop",
}

const useDevice = () => {
  const [device, setDevice] = useState<DeviceTypes>(
    window.innerWidth <= 768 ? DeviceTypes.Mobile : DeviceTypes.Desktop
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDevice(DeviceTypes.Mobile);
      } else {
        setDevice(DeviceTypes.Desktop);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { device };
};

export default useDevice;
