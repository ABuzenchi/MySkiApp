import classes from "./header.module.css";
import alpineSkiingLight from "../../assets/alpine-skiing-light.png";
import { Button, Image } from "@mantine/core";
import { AiFillHome } from "react-icons/ai";
import { FaMap } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import UserProfile from "../user-profile/user-profile";

const Header = () => {

  return (
    <>
    <div className={classes.navBar}>
      <Image src={alpineSkiingLight} />

      <Button variant="default" component="a" href="/" size="lg">
        <AiFillHome />
        Home
      </Button>

      <Button variant="default" component="a" href="/resorts" size="lg">
        <FaMap />
        Resorts
      </Button>

      <Button variant="default" component="a" href="/forum" size="lg">
        <MdForum />
        Forum
      </Button>

     <UserProfile/>
    </div>
    </>
  );
};

export default Header;
