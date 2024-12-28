import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./user-profile.module.css";
import SignUp from "../signUp/signUp";
import SignIn from "../signIn/signIn";

const UserProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);

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
       <SignUp />
       <SignIn/>
        </div>
      </Drawer>

      <Button variant="default" onClick={open}>
        User Profile
      </Button>
    </>
  );
};

export default UserProfile;
