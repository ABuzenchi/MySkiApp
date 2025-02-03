import { useState } from "react";
import classes from "./header.module.css";
import alpineSkiingLight from "../../assets/alpine-skiing-light.png";
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
      <Image src={alpineSkiingLight} className={classes.image} />

      {isMobile ? (
        <>
          <button
            className={classes.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          {menuOpen && (
            <div className={classes.mobileMenu}>
              <Button variant="default" component="a" href="/" size="lg">
                <AiFillHome />
                Home
              </Button>

              <Button variant="default" component="a" href="/forum" size="lg">
                <MdForum />
                Forum
              </Button>

              <ResortsOptions />
              <UserProfile />
            </div>
          )}
        </>
      ) : (
        <>
          <Button variant="default" component="a" href="/" size="lg">
            <AiFillHome />
            Home
          </Button>

          <Button variant="default" component="a" href="/forum" size="lg">
            <MdForum />
            Forum
          </Button>

          <ResortsOptions />
          <UserProfile />
        </>
      )}
    </div>
  );
};

export default Header;
