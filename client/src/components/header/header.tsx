import { useState } from "react";
import classes from "./header.module.css";
import alpineSkiingLight from "../../assets/mountain-header.png";
import { Button, Image } from "@mantine/core";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import UserProfile from "../user-profile/user-profile";
import ResortsOptions from "../resortsOptions/resortsOptions";
import useDevice, { DeviceTypes } from "../../hooks/useDevice";
import { EnDictionary } from "../../dictionaries/en";
import { RoDictionary } from "../../dictionaries/ro";

const Header = () => {
  const { device } = useDevice();
  const isMobile = device === DeviceTypes.Mobile;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={classes.navBar}>
      <div className={classes.leftSection}>
        <Image src={alpineSkiingLight} className={classes.image} />
        <span className={classes.appName}>WinterHeight</span>
      </div>

      {!isMobile ? (
        <div className={classes.centerSection}>
          <Button
            variant="transparent"
            color="#040024"
            component="a"
            href="/"
            size="lg"
          >
            <span className={classes.buttonText}>{RoDictionary.Home}</span>
          </Button>

          <Button
            variant="transparent"
            color="#040024"
            component="a"
            href="/forum"
            size="lg"
          >
            <span className={classes.buttonText}>{EnDictionary.Forum}</span>
          </Button>

          <ResortsOptions />
        </div>
      ) : (
        <>
          <button
            className={classes.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>

          {menuOpen && (
            <div className={classes.mobileMenu}>
              <div className={classes.mobileProfile}>
                <UserProfile />
              </div>

              <Button
                variant="transparent"
                color="white"
              
                component="a"
                href="/"
                className={`${classes.mobileMenuButton} ${classes.firstButton}`}
              >
                {EnDictionary?.Home || "Home"}
              </Button>

              <Button
                variant="transparent"
                color="white"
                className={classes.mobileMenuButton}
                component="a"
                href="/forum"
              >
                {EnDictionary?.Forum || "Forum"}
              </Button>

              <div style={{ width: "100%" }}>
                <ResortsOptions />
              </div>
            </div>
          )}
        </>
      )}

      {!isMobile && (
        <div className={classes.rightSection}>
          <UserProfile />
        </div>
      )}
    </div>
  );
};

export default Header;
