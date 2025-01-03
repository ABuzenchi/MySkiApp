import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./user-profile.module.css";
import SignUp from "../signUp/signUp";
import SignIn from "../signIn/signIn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { login, logout } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode"; // Import corect pentru jwt-decode

const UserProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { username, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expirat
          localStorage.removeItem("authToken");
          dispatch(logout());
        } else {
          // Token valid
          dispatch(login({ username: decodedToken.username }));
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("authToken");
      }
    }
  }, [dispatch]);

    // Funcție de logout
    const handleLogout = () => {
      localStorage.removeItem("authToken"); // Șterge token-ul din localStorage
      dispatch(logout()); // Actualizează starea Redux pentru deconectare
      close(); // Închide Drawer-ul
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
            <p className={classes.welcomeMessage}>Hello, {username}!</p>
            <Button variant="default" onClick={handleLogout}>
            Logout
          </Button>
          </>
          ) : (
            <>
              <SignUp />
              <SignIn />
            </>
          )}
        </div>
      </Drawer>

      <Button variant="default" onClick={open}>
        User Profile
      </Button>
    </>
  );
};

export default UserProfile;
