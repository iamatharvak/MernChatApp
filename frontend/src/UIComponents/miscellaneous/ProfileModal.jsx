import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { ViewIcon, PhoneIcon } from "@chakra-ui/icons";
import {FaVideo} from "react-icons/fa"
// import { Icon } from "@chakra-ui/core";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <div style={{ display: "flex", gap: "4px" }}>
          <IconButton icon={<PhoneIcon />} />
          <IconButton icon={<FaVideo />} aria-label="Video Call" />
          <IconButton display="flex" icon={<ViewIcon />} onClick={onOpen} />
        </div>
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="sans-serif"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text fontSize={{ md: "30px" }} fontFamily="-moz-initial">
              Email :{user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
