import { useState } from "react";
import classes from "./header.module.css";
import alpineSkiingLight from "../../assets/mountainDark.png";
import { Button, Image } from "@mantine/core";
import { AiFillHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdForum } from "react-icons/md";
import UserProfile from "../user-profile/user-profile";
import ResortsOptions from "../resortsOptions/resortsOptions";
import useDevice, { DeviceTypes } from "../../hooks/useDevice";

const Header = () => {
  const { device } = useDevice();
  const isMobile = device === DeviceTypes.Mobile;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={classes.navBar}>
      {/* Logo - Stânga */}
      <div className={classes.leftSection}>
        <Image src={alpineSkiingLight} className={classes.image} />
      </div>

      {/* Meniu - Centru */}
      {!isMobile ? (
        <div className={classes.centerSection}>
          <Button variant="transparent" color="#040024" component="a" href="/" size="lg">
            <AiFillHome />
            <span className={classes.buttonText}>Home</span>
          </Button>

          <Button variant="transparent" color="#040024" component="a" href="/forum" size="lg">
            <MdForum />
            <span className={classes.buttonText}>Forum</span>
          </Button>

          <ResortsOptions />
        </div>
      ) : (
        <>
          <button className={classes.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          {menuOpen && (
            <div className={classes.mobileMenu}>
              <Button variant="transparent" color="#040024" component="a" href="/" size="lg">
                <AiFillHome />
                <span className={classes.buttonText}>Home</span>
              </Button>

              <Button variant="transparent" color="#040024" component="a" href="/forum" size="lg">
                <MdForum />
                <span className={classes.buttonText}>Forum</span>
              </Button>

              <ResortsOptions />
              <UserProfile />
            </div>
          )}
        </>
      )}

      {/* User Profile - Dreapta */}
      <div className={classes.rightSection}>
        <UserProfile />
      </div>
    </div>
  );
};

export default Header;
