import React, { useState } from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
  Stack,
  Icon,
  Flex,
  ModalFooter
} from '@chakra-ui/react';

import {  AiOutlineLock } from "react-icons/ai";
import TopBar from '../Components/TopBar/TopBar';
import { confirmForgotPassword } from '../Components/fetch.mjs';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('')
  const [alert, setAlert] = useState(false)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: handle submitting new password
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    console.log(token)
    confirmForgotPassword(newPassword, token)
    .then((result) => {
      console.log(result)
      // display result
      setResponse(result)
      setAlert(true);
      
      // wait 5 seconds and navigate back to landing page
      if (result.status == "success") {
      setTimeout(() => {
        navigate("/")
      }, 2500);
    }

    })
    .catch((error) => console.log(error))
    };

  return (
    <>
      <Box p={4}>
        <TopBar noItems={true}/>
      </Box>
      
      <Modal isOpen={isOpen} maxW={"500px"}>
        <ModalOverlay />
        <ModalContent w={"150%"}>
          <ModalHeader></ModalHeader>
          <ModalBody>
            {/* TODO: add help content */}
          

        <Flex alignItems="center">
          <Icon as={AiOutlineLock} boxSize={10} mr={4} />
          <Heading as="h1" size="lg">Forgot Password</Heading>
        </Flex>

        <form onSubmit={handleSubmit}>
          <FormControl id="newPassword" isRequired mb={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </FormControl>

          <FormControl id="confirmNewPassword" isRequired mb={8}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
          </FormControl>
          <Stack
              alignItems="center"
              justifyContent="center"
              spacing={2}
              direction="row"
              alignSelf="center"
            >
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            isDisabled={newPassword !== confirmNewPassword}
          >
            
              <Text>Submit</Text>
            
          </Button></Stack>
        </form>
        
      
      

      </ModalBody>
      <ModalFooter>
          </ModalFooter>
          {alert && (
            <Alert status={response.status} mt={4}>
              <AlertIcon />
              {response.message}
            </Alert>
          )}
        </ModalContent>
      </Modal>
      
    </>
  );
};

export default ForgotPassword;
