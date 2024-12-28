import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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