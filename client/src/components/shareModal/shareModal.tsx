import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { FaShareAlt } from "react-icons/fa";
import classes from "./shareModal.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

const ShareModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const currentUrl = window.location.href;


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
        {/* <QRCode value={currentUrl} size={160} /> */}
          <Button variant="transparent"  className={classes.whatsappButton}>
            <FaWhatsapp className={classes.icon} />
          </Button>
          <Button variant="transparent"  className={classes.facebookButton}>
            <FaFacebook className={classes.icon}/>
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
