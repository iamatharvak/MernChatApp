import { useDisclosure } from "@chakra-ui/react/dist/chakra-ui-react.cjs";


import React from "react";

const ProfilaModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return;
  <>
  
    <div>{children}</div>
  </>;
};

export default ProfilaModal;
