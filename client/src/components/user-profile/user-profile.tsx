import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./user-profile.module.css";
import SignUp from "../signUp/signUp";
import SignIn from "../signIn/signIn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { login, logout } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode";
import UserAvatar from "../UserAvatar/UserAvatar";
import { FaUserAlt } from "react-icons/fa";

const UserProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { username, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("authToken");
          dispatch(logout());
        } else {
          const savedAvatar = localStorage.getItem(`userAvatar_${decodedToken.username}`);
          if (savedAvatar) {
            dispatch(login({ username: decodedToken.username, avatar: savedAvatar }));
          } else {
            dispatch(login({ username: decodedToken.username, avatar: null }));
          }
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("authToken");
      }
    }
  }, [dispatch]);
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    close();
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="User Profile"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        position="right"
        classNames={{
          root: classes.drawerRoot,
          header: classes.drawerHeader,
        }}
      >
        <div className={classes.butttonsContainer}>
          {isAuthenticated ? (
            <>
              <div className={classes.userContainer}>
                <UserAvatar username={username}/>
                <Button variant="default" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className={classes.authContainer}>
                <SignUp />
                <SignIn />
              </div>
            </>
          )}
        </div>
      </Drawer>

      <Button variant="transparent" color="black"  onClick={open} size="lg">
        <FaUserAlt></FaUserAlt>
        <span className={classes.buttonText}>User Profile</span>
      </Button>
    </>
  );
};

export default UserProfile;
