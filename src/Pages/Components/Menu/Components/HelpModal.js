import { useEffect, useState } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Textarea,
  Alert,
  AlertIcon
} from "@chakra-ui/react";

function HelpModal({ isOpen, onClose }) {
  const [subject, setSubject] = useState("");
  const [about, setAbout] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    // send the message and update the state
    setIsSent(true);
  };
  useEffect(() => {
    if (isOpen == false) { setIsSent(false) }
  },[isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Subject</FormLabel>
            <Input
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>About (Max 500 characters)</FormLabel>
            <Textarea
                placeholder="Enter message"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                maxLength={500}
                resize="vertical"
                size="sm"
                />

          </FormControl>
          <Flex justifyContent="center" mt={4}>
            <Button colorScheme="blue" onClick={handleSend}>
              Send
            </Button>
          </Flex>
          {isSent && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              Message has been sent. You will receive an email with our response.
            </Alert>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default HelpModal;