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

import { Payment } from './Payment/Payment'

function PaymentModal({ isOpen, onClose }) {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Payment></Payment>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PaymentModal;