import { useEffect, useState } from "react";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Link,
  VStack,
  Heading,
  Divider,
  List,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

function HelpModal({ isOpen, onClose }) {

 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <VStack spacing={6} align="stretch">
        <Text fontSize="lg">
              We're here to help! Below you'll find some helpful information to
              get you started. If you don't find what you're looking for, don't
              hesitate to reach out to us at{" "}
              <Link href="mailto:support@quickessays.app">
                support@quickessays.app
              </Link>{" "}
              and we'll get back to you as soon as we can.
            </Text>
            <Divider />
            <Heading size="sm" color="gray.700">
              Frequently Asked Questions
            </Heading>
            <UnorderedList fontSize="md" pl={4}>
              <ListItem>
                <Text>
                  <strong>What is QuickEssays?</strong> QuickEssays is an
                  online platform that provides high-quality custom writing
                  services to students and professionals all over the world.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>How do I purchase?</strong> To purchase a package,
                  simply click the "Prices" button on our menu and follow the
                  instructions.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>What types of essays do you write?</strong> We
                  write any essay you want All essays are
                  completely customizable!
                </Text>
              </ListItem>
              
              <ListItem>
                <Text>
                  <strong>How do I pay for my order?</strong> We accept payments
                  via Stripe, which is a secure and reliable payment processor
                  used by many online businesses. You can pay using any major
                  credit card or debit card.
                </Text>
              </ListItem>
            </UnorderedList>

          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default HelpModal;