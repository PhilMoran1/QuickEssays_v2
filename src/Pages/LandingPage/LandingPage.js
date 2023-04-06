import react, {useState, useEffect} from 'react'
import { isRouteErrorResponse, useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Checkbox,
    Flex,
    Heading,
    Image,
    Link,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Stack,
    Text,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon
  } from '@chakra-ui/react';

import { createAccount, fetchLogin } from '../Components/fetch.mjs';
import InfoBox from './Components/InfoBox';
import TypeEffect from './Components/TypeEffect';
import TermsOfService from '../Components/Menu/Components/TermsOfService.js';
import PrivacyPolicy from '../Components/Menu/Components/PrivacyPolicy.js';
import MoreInfo from './Components/MoreInfo.js';
function LandingPage() {
    
    const nav = useNavigate()

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState('')
    const [alert, setAlert] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const [isTOSopen, setIsTOSopen] = useState(false);
    const [isPPopen, setIsPPopen] = useState(false);
    const closeTOS = () => setIsTOSopen(false);
    const closePP = () => setIsPPopen(false);

    const handleLoginOpen = () => setShowLoginModal(true);
    const handleLoginClose = () => setShowLoginModal(false);
  
    const handleSignupOpen = () => setShowSignupModal(true);
    const handleSignupClose = () => setShowSignupModal(false);

    
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        fetchLogin(email,password).then((result) => {
            setResponse(result)
            setAlert(true)
            if (result.status == "success") {nav("/home")}
        }).catch((error) => {setResponse(error)});
      };

    const validateEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          return false;
        } else {
          return true;
        }
      };

    const handleSignupSubmit = (e) => {
      if (!validateEmail(email)) {
        setResponse({status: "error", message: "Invalid Email adress"})
        setAlert(true);
        return;  
      }
      if (isChecked) {
        // submit signup data to server
        e.preventDefault();
        // handle signup logic here
        createAccount(name,email,password).then((result) => {

            setAlert(true)
            if (result.status == "success") {
                setResponse(result.message)
                setShowSignupModal(false)
                setShowLoginModal(true)
            }
            else  {
                setResponse(result)
                setAlert(true)
            }
          }).catch((error) => {
          });
      } else {
        setResponse({status: "error", message: "Please read and accept the terms of service and privacy policy."})
        setAlert(true);  
      }
    
    };
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [flexdir,setFlexdir] = useState("")

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };

    useEffect(() => {
      function handleResize() {
        setIsMobile(window.innerWidth < 768);
        
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {if (isMobile) {setFlexdir("column")} else { setFlexdir("") }}, [isMobile])
  return (
    <>
    <TermsOfService isOpen={isTOSopen} onClose={closeTOS}></TermsOfService>
    <PrivacyPolicy isOpen={isPPopen} onClose={closePP}></PrivacyPolicy>
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      minHeight="100vh"
      bg="#d2d2d2"
      position="relative"
    >
    
        <Modal isOpen={showLoginModal} onClose={handleLoginClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Stack spacing="20px">
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(event) => {setEmail(event.target.value)}}/>
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(event) => {setPassword(event.target.value)}}/>
              </FormControl>
              <a onClick={() => {nav("/forgot-password")}}>forgot password?</a>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLoginSubmit}>
              Login
            </Button>
            <Button onClick={handleLoginClose}>Cancel</Button>

            

          </ModalFooter>
          {alert && (
            <Alert status={response.status} mt={4}>
              <AlertIcon />
              {response.message}
            </Alert>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={showSignupModal} onClose={handleSignupClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Signup</ModalHeader>
          <ModalBody>
            <Stack spacing="20px">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" onChange={(event) => {setName(event.target.value)}}/>
              </FormControl>

              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={(event) => {setEmail(event.target.value)}}/>
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(event) => {setPassword(event.target.value)}}/>
              </FormControl>
            </Stack>
            <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
              I have read and agree to the terms of service and privacy policy.
            </Checkbox>
            <Box pt={8} display="flex" justifyContent="center" alignItems="flex-end" bottom={0}>
            <Text onClick={() => {setIsPPopen(true); setShowSignupModal(false)}} _hover={{ textDecoration: "underline", cursor: "pointer"}}> Privacy Policy ·  </Text>
            <Text onClick={() => {setIsTOSopen(true); setShowSignupModal(false)}} _hover={{ textDecoration: "underline", cursor: "pointer"}}> Terms of Service </Text>
          </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSignupSubmit}>
              Signup
            </Button>
            <Button onClick={handleSignupClose}>Cancel</Button>
          </ModalFooter>
          {alert && (
            <Alert status={response.status} mt={4}>
              <AlertIcon />
              {response.message}
            </Alert>
          )}
        </ModalContent>
      </Modal>

        <Box position="absolute" top="0" right="0" p={4}>
        <Button onClick={handleLoginOpen} bg="gray.700"size="md"       _hover={{ bg: "gray.800" }} zIndex={"999999999"}>
          <Text color="white">Log In</Text>

        </Button>
      </Box>
      <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '40%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 0,
          overflow: 'hidden'

        }}>
        </div>
      <Box
        width="80%"
        maxW="1200px"
        textAlign="center"
        position="relative"
        zIndex="1"
      >
        
      <Flex top={2} left={-5} position="absolute">
          <Image src="profilepic.jpg" alt="Logo" borderRadius="50%" boxSize="40px" />
          <Text
            fontSize="150%"
            fontWeight="bold"
            color="#4d4d4d"
            ml="2"
          >
            Quickessays
          </Text>
          <Stack />
        </Flex>
        <Text
          fontSize={isMobile ? "250%" : "500%"}
          fontWeight="bold"
          mb={6}
          color="#4d4d4d"
          mt="20"
        >
          Welcome to Quickessays!
        </Text>

        <Text fontSize="xl" mb={12} color="#666">
          Powerful Essays written by the most advanced AI in the world!
        </Text>

        {!isMobile ? (
        <>
        
        <Flex justifyContent="center" alignItems="center">
        <Box w="30%" css={{ position: "absolute" }}>
          <TypeEffect type="about"/>
        </Box>
        {/* <Box w="30%" css={{ position: "absolute", left: "33.33%" }}>
          <TypeEffect type="styles" />
        </Box>
        <Box w="30%" css={{ position: "absolute", left: "66.66%" }}>
          <TypeEffect type="audience"/>
        </Box> */}
      </Flex>

        <Button onClick={handleSignupOpen} bg="gray.700" size="lg" mb={8} marginTop={"15%"}       _hover={{ bg: "gray.800" }}>
          <Text color="white">Get Started</Text>
        </Button>
        </>
        ) : (
          <>
          <Box alignItems={"center"} display={"table-row-group"}>
            <TypeEffect type="about"/>
          </Box>
          <Button onClick={handleSignupOpen} bg="gray.700" size="lg" mb={8} marginTop={"35%"}       _hover={{ bg: "gray.800" }}>
            <Text color="white">Get Started</Text>
          </Button>
          </>
        )}
        <Flex justify="space-between" flexDirection={flexdir}>

            <InfoBox 
            price={"2.99$"}
            info={"5 essays / 2 retries per essay"}
            name={"Basic"}
            context={flexdir}
            />
            <InfoBox 
            price={"4.99$"}
            info={"10 essays / 4 retries per essay"}
            name={"Standard"}
            context={flexdir}
            />
            <InfoBox 
            price={"39.99$"}
            info={"100 essays / 6 retries per essay"}
            name={"Premium"}
            context={flexdir}
            />
        </Flex>
          <MoreInfo isMobile={isMobile}></MoreInfo>
      </Box>
      <Text opacity={0}>
            break       
      </Text>

      <Flex
        bg="#2a2a2a"
        color="#fff"
        px={6}
        py={8}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        left="0"
      >
        
        <Text fontSize="sm" mb={2}>
          &copy; 2023, QuickEssays. All rights reserved.
        </Text>
        <Stack direction="row" spacing={6}>
          <Text onClick={() => {setIsPPopen(true)}} _hover={{ textDecoration: "underline", cursor: "pointer"}}>Privacy Policy</Text>
          <Text onClick={() => {setIsTOSopen(true)}} _hover={{ textDecoration: "underline", cursor: "pointer" }}>Terms of Use</Text>
          <Box as="a" href="mailto:support@quickessays.app" _hover={{ textDecoration: "underline", cursor: "pointer" }}>
          <Text>Contact Us</Text>
          </Box>
        </Stack>
      </Flex>
    </Flex>
    </>
  );
}

export default LandingPage;




