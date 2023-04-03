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


function TermsOfService({ isOpen, onClose }) {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Terms of service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <ol>
      <li>
        <h2>Acceptance of Terms</h2>
        <p>By using our website, you agree to these Terms of Service and our Privacy Policy. If you do not agree with these terms, please do not use our website.</p>
      </li>
      <li>
        <h2>User Conduct</h2>
        <p>You agree to use our website only for lawful purposes and in a way that does not infringe on the rights of others. You may not use our website to generate or distribute essays that are defamatory, obscene, or violate the intellectual property rights of others.</p>
      </li>
      <li>
        <h2>Intellectual Property</h2>
        <p>All content on our website, including AI-generated essays, is the property of QuickEssays and may not be reproduced or distributed without our express written permission.</p>
      </li>
      <li>
        <h2>Disclaimers</h2>
        <p>We make no warranties or guarantees as to the accuracy, completeness, or reliability of the AI-generated essays provided on our website. You use our website and its content at your own risk.</p>
      </li>
      <li>
        <h2>Liability Limitations</h2>
        <p>We are not liable for any damages, including but not limited to, direct, indirect, incidental, consequential, or punitive damages, arising from your use of our website.</p>
      </li>
      <li>
        <h2>Termination</h2>
        <p>We reserve the right to terminate your access to our website at any time for any reason without prior notice.</p>
      </li>
      <li>
        <h2>Governing Law</h2>
        <p>This agreement is governed by the laws of [Jurisdiction], and any disputes arising from this agreement will be resolved in the courts of [Jurisdiction].</p>
      </li>
      <li>
        <h2>Modifications</h2>
        <p>We may modify these terms of service at any time. We will notify users of any changes by posting the updated terms on our website.</p>
      </li>
      <li>
        <h2>Privacy Policy</h2>
        <p>Our Privacy Policy outlines how we collect, use, and share user data. By using our website, you agree to the terms of our Privacy Policy.</p>
      </li>
    </ol>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TermsOfService;