import { useEffect, useState } from "react";
import FeatureSlidingDrawer, { SlidingState } from "../FeatureSlidingDrawer/FeatureSlidingDrawer";
import FeatureDrawer from "../FeatureDrawer/FeatureDrawer";
import useDevice, { DeviceTypes } from "../../hooks/useDevice";
import { useDisclosure } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logout } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode";
import { getUserByUsername } from "../../store/getUserByUsername";
import { FaUserAlt } from "react-icons/fa";
import UserAvatarImage from "../UserAvatar/UserAvatarImage/UserAvatarImage";
import UserProfileContent from "./userProfileContent/userProfileContent";
import OtherUserProfileContent from "./otherUserProfile/otehrUserProfile";
import { Button } from "@mantine/core";

const UserProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();
  const { username, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [slidingState, setSlidingState] = useState(SlidingState.Hidden);
  const { device } = useDevice();
  const isMobile = device === DeviceTypes.Mobile || device === DeviceTypes.MobilePortrait;

  const [viewMode, setViewMode] = useState<"self" | "other">("self");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("authToken");
          dispatch(logout());
        } else {
          dispatch(getUserByUsername(decodedToken.username));
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("authToken");
      }
    }
  }, [dispatch]);

  const openSelfProfile = () => {
    setViewMode("self");
      console.log("✅ Click pe Avatar — deschide UserProfile");

    open();
  };

  const openUserProfile = (username: string) => {
    setSelectedUser(username);
    setViewMode("other");
    open();
    if (isMobile) setSlidingState(SlidingState.Full);
  };

  const handleClose = () => {
    console.log("Meow");
    close();
    setSelectedUser(null);
    setViewMode("self");
    setSlidingState(SlidingState.Hidden);
     console.log("🔒 handleClose triggered, opened=", opened);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    close();
  };

  const drawerTitle = viewMode === "self" ? `Profile: ${username}` : `Profile: ${selectedUser}`;

  const Content = viewMode === "self"
    ? <UserProfileContent openUserProfile={openUserProfile} onLogout={handleLogout}  />
    :  <OtherUserProfileContent username={selectedUser} openUserProfile={openUserProfile} />
    ;

  return (
    <>
      {isMobile ? (
        <FeatureSlidingDrawer
          onSlidingStateChanged={setSlidingState}
          slidingState={slidingState}
          opened={opened}
          onFeaturesMenu={() => setSlidingState(SlidingState.Full)}
          title={drawerTitle}
          onClose={handleClose}
        >
          {Content}
        </FeatureSlidingDrawer>
      ) : (
        <FeatureDrawer
          opened={opened}
          onClose={handleClose}
          onFeaturesMenu={() => {}}
          title={drawerTitle}
        >
          {Content}
        </FeatureDrawer>
      )}

      <Button data-testid="user-avatar-button" style={{ position: "fixed", top: 16, right: 16, zIndex: 1 }} variant="transparent" color="#040024" onClick={openSelfProfile} size="lg">
        {isAuthenticated ? (
          <UserAvatarImage username={username} size="md" />
        ) : (
          <FaUserAlt />
          
        )}
      </Button>
    </>
  );
};

export default UserProfile;
