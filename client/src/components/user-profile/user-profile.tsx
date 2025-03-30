import { Button, Drawer, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./user-profile.module.css";
import SignUp from "../signUp/signUp";
import SignIn from "../signIn/signIn";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { login, logout } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode";
import UserAvatar from "../UserAvatar/UserAvatar";
import { FaUserAlt } from "react-icons/fa";
import { EnDictionary } from "../../dictionaries/en";
import UserAvatarImage from "../UserAvatar/UserAvatarImage/UserAvatarImage";
import FirstFavorite from "../../assets/first-favorite.png";
import FirstSlope from "../../assets/first-slope.png";
import FirstReview from "../../assets/reviews.png";
import { getUserByUsername } from "../../store/getUserByUsername";
import DayTrackForm from "../day-track/day-track";

const UserProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);
   const dispatch = useDispatch<AppDispatch>();
  const { username, isAuthenticated, favoriteSlopes,visitedSlopes,profilePicture} = useSelector(
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
          dispatch(getUserByUsername(decodedToken.username));
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

  const statsData = [
    { id: 1, icon: "🏔️", value: favoriteSlopes.length, label: "Favorite Slopes" }, // Adaugă numărul de favorite
    { id: 2, icon: "🎿", value: visitedSlopes.length, label: "Visited Slopes" }, // Adaugă numărul de vizitate
    { id: 3, icon: "🔷", value: "Sapphire", label: "Current League" },
    { id: 4, icon: "🏅", value: "5", label: "League Medals" },
  ];
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
                <UserAvatar username={username} />
                <div className={classes.container}>
                  <h3 className={classes.title}>Statistics</h3>
                  <div className={classes.grid}>
                    {statsData.map((stat) => (
                      <div key={stat.id} className={classes.statBox}>
                        <span className={classes.icon}>{stat.icon}</span>
                        <div className={classes.info}>
                          <span className={classes.value}>{stat.value}</span>
                          <span className={classes.label}>{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={classes.container}>
                  <h3 className={classes.title}>Achievements</h3>
                  <div className={classes.imageContainer}>
                    <Image src={FirstFavorite} className={classes.image} />
                    <Image src={FirstSlope} className={classes.image} />
                    <Image src={FirstReview} className={classes.image} />
                  </div>
                </div>
                <div className={classes.container}>
                  <h3 className={classes.title}>Friends</h3>
                </div>
                <Button variant="default" onClick={handleLogout}>
                  {EnDictionary.Logout}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className={classes.authContainer}>
                <SignUp />
                <SignIn />
                <DayTrackForm/>
              </div>
            </>
          )}
        </div>
      </Drawer>

      <Button variant="transparent" color="#040024" onClick={open} size="lg">
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
