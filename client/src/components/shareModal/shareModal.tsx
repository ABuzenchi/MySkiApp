import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Input,
  Tooltip,
  ActionIcon,
  CopyButton,
} from "@mantine/core";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import classes from "./shareModal.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import QRCode from "react-qr-code";
import { useState } from "react";

const ShareModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const currentUrl = window.location.href;
  const [copyTooltip, setCopyTooltip] = useState("Copiază");

  const handleWhatsappShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Share"
        centered
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        size="md"
        classNames={{
          title: classes.customModalTitle,
        }}
      >
        <div className={classes.container}>
          <Button
            variant="transparent"
            className={classes.whatsappButton}
            onClick={handleWhatsappShare}
          >
            <FaWhatsapp className={classes.icon} />
          </Button>
          <Button
            variant="transparent"
            className={classes.facebookButton}
            onClick={handleFacebookShare}
          >
            <FaFacebook className={classes.icon} />
          </Button>
          <QRCode value={currentUrl} size={80} />
        </div>
        <div className={classes.urlContainer}>
        <Input.Placeholder>{currentUrl}</Input.Placeholder>
          <CopyButton value={currentUrl} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copiat!" : "Copiază"}
                withArrow
                position="top"
              >
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  variant="subtle"
                  onClick={copy}
                >
                  <FaCopy size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </div>
      </Modal>
      <Button variant="transparent" size="sm" onClick={open}>
        <FaShareAlt />
      </Button>
    </>
  );
};
export default ShareModal;
