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
  AlertIcon,
  Link
} from "@chakra-ui/react";

function HelpModal({ isOpen, onClose }) {
  const [subject, setSubject] = useState("");
  const [about, setAbout] = useState("");
  const [response, setResponse] = useState(false);

  useEffect(() => {
    if (isOpen == false) { setResponse(false) }
  },[isOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/*<FormControl>
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
          {response && (
            <Alert status={response.status} mt={4}>
              <AlertIcon />
              {response.message}
            </Alert>
          )} */}
      <Text>If you have any questions or need help, please contact us at <Link href="mailto:support@quickessays.app">support@quickessays.app</Link> And we'll get in touch as soon as we can. You can also find more information about our prices by visiting our pricing page. If you need to change your password, please visit settings page.</Text>
             </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default HelpModal;