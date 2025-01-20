import classes from "./header.module.css";
import alpineSkiingLight from "../../assets/alpine-skiing-light.png";
import { Button, Image } from "@mantine/core";
import { AiFillHome } from "react-icons/ai";
import { MdForum } from "react-icons/md";
import UserProfile from "../user-profile/user-profile";
import ResortsOptions from "../resortsOptions/resortsOptions";
import { Dictionary } from "../../dictionaries/en";

const Header = () => {
  return (
    <>
      <div className={classes.navBar}>
        <Image src={alpineSkiingLight} />

        <Button variant="default" component="a" href="/" size="lg">
          <AiFillHome />
          {Dictionary.Home}
        </Button>

        <Button variant="default" component="a" href="/forum" size="lg">
          <MdForum />
          {Dictionary.Forum}
        </Button>
        <ResortsOptions></ResortsOptions>

        <UserProfile />
      </div>
    </>
  );
};

export default Header;
