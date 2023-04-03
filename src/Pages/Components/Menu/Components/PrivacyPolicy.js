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


function PrivacyPolicy({ isOpen, onClose }) {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Privacy Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody maxHeight="80vh" overflow="auto">
        <h1>Privacy Policy</h1>
	<p>This Privacy Policy describes how QuickEssays ("we", "us", or "our") collects, uses, and shares information about you when you use our website or our services.</p>
	<h2>Information We Collect</h2>
	<p>We collect information that you voluntarily provide to us, such as your name, email address, and other contact information. We also collect information about your use of our website, such as your IP address, browser type, device information, and other similar information.</p>
	<p>In addition, we may collect the following user data, which we may sell to third-party service providers:</p>
	<ul>
		<li>URL</li>
		<li>Timestamp</li>
		<li>Created</li>
		<li>Operating system</li>
		<li>CPU model name</li>
		<li>User ID</li>
		<li>User birthday</li>
		<li>User country</li>
		<li>User city</li>
		<li>User state</li>
		<li>User gender</li>
	</ul>
	<h2>How We Use Your Information</h2>
	<p>We use the information we collect to provide you with our services and to improve our website. We may also use your information to communicate with you about our services, to send you marketing materials or other information that may be of interest to you, and to personalize your experience on our website.</p>
	<h2>How We Share Your Information</h2>
	<p>We may share your information with third-party service providers who help us provide our services. We may also share your information with law enforcement or other government agencies if required by law or if we believe that disclosure is necessary to protect our rights or the rights of others.</p>
	<h2>Security</h2>
	<p>We take reasonable measures to protect the information we collect from unauthorized access, disclosure, or destruction. However, no security system is impenetrable, and we cannot guarantee the security of our systems.</p>
	<h2>Children's Privacy</h2>
	<p>Our website is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under 13.</p>
	<h2>Changes to Our Privacy Policy</h2>
	<p>We may modify this Privacy Policy at any time, and any changes will be effective immediately upon posting. Your continued use of our website or our services after the posting of any modified Privacy Policy indicates your acceptance of the changes.</p>
	<h2>Contact Us</h2>
	<p>If you have any questions about this Privacy Policy or our practices, please contact us at "email".</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PrivacyPolicy;