import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { FaShareAlt } from 'react-icons/fa';

const ShareModal=()=> {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Share" centered={true}  overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
       Meow
      </Modal>

      <Button variant="transparent" size="sm" onClick={open}>
        <FaShareAlt />
      </Button>
    </>
  );
}
export default ShareModal;