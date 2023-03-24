import React, { useState } from "react";

import {
  Stack,
  IconButton,
  Text,
  Input,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";



import { FaBars,FaCog, FaDollarSign, FaQuestionCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import HelpModal from "./Components/HelpModal";
import PricingModal from "./Components/PricingModal";
import SettingsModal from "./Components/SettingsModal";




function Menu() {
    console.log("here")
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
  
    const openSettingsModal = () => setIsSettingsOpen(true);
    const closeSettingsModal = () => setIsSettingsOpen(false);
    const openPricingModal = () => setIsPricingOpen(true);
    const closePricingModal = () => setIsPricingOpen(false);
    const openHelpModal = () => setIsHelpOpen(true);
    const closeHelpModal = () => setIsHelpOpen(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
    <SettingsModal isOpen={isSettingsOpen} onClose={closeSettingsModal} />
    <PricingModal isOpen={isPricingOpen} onClose={closePricingModal} />
    <HelpModal isOpen={isHelpOpen} onClose={closeHelpModal} />

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg="white" color="gray.700">
        <DrawerCloseButton />
        <Text fontSize="xl" fontWeight="bold" mt={4} mb={8}>
          Menu
        </Text>
        <Stack spacing={4} pl={4}>
          <Button variant="ghost" leftIcon={<FaCog />} onClick={() => setIsSettingsOpen(true)}>
            Settings
          </Button>
          <Button variant="ghost" leftIcon={<FaDollarSign />} onClick={() => setIsPricingOpen(true)}>
            Price
          </Button>
          <Button variant="ghost" leftIcon={<FaQuestionCircle />} onClick={() => setIsHelpOpen(true)}>
            Help
          </Button>
          <Box pt={8} display="flex" justifyContent="center" alignItems="flex-end" bottom={0}>
            <Link to="/privacy">Privacy Policy ·  </Link>
            <Link to="/terms"> Terms of Service</Link>
          </Box>
        </Stack>
      </DrawerContent>
    </Drawer>
    {/* Right button */}
    <IconButton
          aria-label="Menu"
          icon={<FaBars />}
          size="md"
          variant="outline"
          onClick={onOpen}
      backgroundColor="white"

        />
    </>
    );
}

export default Menu;