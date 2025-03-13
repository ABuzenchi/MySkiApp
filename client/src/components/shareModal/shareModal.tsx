import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { FaShareAlt } from "react-icons/fa";
import classes from "./shareModal.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

const ShareModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Share"
        centered
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        size='md'
        classNames={{
          title: classes.customModalTitle, 
        }}
      >
        <div className={classes.container}>
          <p>QR CODE</p>
          <Button variant="transparent" size="xl" className={classes.whatsappButton}>
            <FaWhatsapp />
          </Button>
          <Button variant="transparent" size="xl" className={classes.facebookButton}>
            <FaFacebook />
          </Button>
        </div>
      </Modal>
      <Button variant="transparent" size="sm" onClick={open}>
        <FaShareAlt />
      </Button>
    </>
  );
};
export default ShareModal;
