import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./user-profile.module.css"

const UserProfile=()=>{
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        position="right"
        classNames={{
          root: classes.drawerRoot, // Stil personalizat pentru poziționare exactă
          header: classes.drawerHeader, // Poți adăuga stiluri și pentru alte părți
        }}
      >
      <div>Meow meow meow</div>
      </Drawer>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>
    </>
  );
}

export default UserProfile;