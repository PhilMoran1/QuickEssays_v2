import { useEffect, useState } from "react";
import {
  Box,
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
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent overflow="auto">
        <ModalHeader>Terms of service</ModalHeader>
        <ModalCloseButton />
        <ModalBody >
        <h1>Terms and Conditions of QuickEssays</h1>
    <p>Welcome to QuickEssays (the "Website"). These Terms and Conditions ("Terms") govern your use of the Website and constitute a legal agreement between you and QuickEssays. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Website.</p>

    <h2>1. Introduction</h2>
    <p>Welcome to QuickEssays (the "Website"). These Terms and Conditions ("Terms") govern your use of the Website and constitute a legal agreement between you and QuickEssays. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Website.
    </p>

    <h2>2. Ownership and Content</h2>
    <p>All content on the Website, including but not limited to text, images, trademarks, logos, and graphics, are the exclusive property of QuickEssays and are protected by intellectual property laws. You may not use, copy, reproduce, distribute, or modify any content on the Website without the express written permission of QuickEssays.
    </p>

    <h2>3. User Accounts</h2>
    <p>You may create an account on the Website, subject to these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must provide accurate and up-to-date information when creating and using your account. QuickEssays reserves the right to suspend or terminate your account at any time, without notice, if you violate these Terms or engage in any fraudulent, abusive, or illegal activities.
    </p>

    <h2>4. User Content</h2>
    <p>You are not allowed to create, upload, or share any content on the Website, including text and images. All content on the Website is owned by QuickEssays, and you may not use, copy, or modify any content without permission.
    </p>

    <h2>5. Purchases</h2>
    <p>Users may be able to purchase goods, products, or items on the Website. All purchases are subject to the applicable terms and conditions, including pricing, payment, and shipping policies, as stated on the Website.
    </p>

    <h2>6. Feedback and Suggestions</h2>
    <p>If you provide QuickEssays with any feedback, suggestions, or ideas regarding the Website or its services, you agree that QuickEssays may use such feedback or suggestions without any obligation to provide you with compensation or credits.
    </p>

    <h2>7. Promotions, Contests, and Sweepstakes</h2>
    <p>QuickEssays does not currently offer promotions, contests, or sweepstakes on the Website. If such features are introduced in the future, they will be subject to separate terms and conditions.
    </p>

    <h2>8. Contact</h2>
    <p>If you have any questions, comments, or concerns about these Terms or the Website, you may contact QuickEssays at support@quickessays.app.
    </p>

    <h2>9. Governing Law and Jurisdiction</h2>
    <p>
    These Terms shall be governed by and construed in accordance with the laws of Spain. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Spain.
    </p>

    <h2>10. Changes to Terms</h2>
    <p>QuickEssays reserves the right to modify or update these Terms at any time, without notice. By continuing to use the Website after any changes to these Terms, you are indicating your acceptance of the updated Terms.
    </p>

    <p>Last updated: 04/05/2023</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TermsOfService;