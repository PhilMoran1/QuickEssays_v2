import react, {useState, useEffect} from 'react'
import { isRouteErrorResponse, useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
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

import { createAccount, fetchLogin } from '../Components/fetch';
import InfoBox from './Components/InfoBox';
import TypeEffect from './Components/TypeEffect';

function LandingPage() {

    const nav = useNavigate()

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [response, setResponse] = useState('')
    const [alert, setAlert] = useState(false)
    const handleLoginOpen = () => setShowLoginModal(true);
    const handleLoginClose = () => setShowLoginModal(false);
  
    const handleSignupOpen = () => setShowSignupModal(true);
    const handleSignupClose = () => setShowSignupModal(false);

    
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        fetchLogin(email,password).then((result) => {
            setResponse(result)
            setAlert(true)
            if (result.status == "success") {nav("/home")}
        }).catch((error) => {setResponse(error)});
      };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
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
            console.log(error)
          });
    
    };

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [flexdir,setFlexdir] = useState("")
    useEffect(() => {
      function handleResize() {
        setIsMobile(window.innerWidth < 768);
        
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {if (isMobile) {setFlexdir("column")} else { setFlexdir("") }}, [isMobile])

  return (
    
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
                <Input type="email" onChange={(event) => {setEmail(event.target.value)}} />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={(event) => {setPassword(event.target.value)}}/>
              </FormControl>
            </Stack>
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
        <Button onClick={handleLoginOpen} colorScheme="blue" size="md">
          Log in
        </Button>
      </Box>
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
        <Heading as="h1" size="2xl" mb={6} color="#4d4d4d" mt="20">
          Welcome to Quickessays!
        </Heading>
        <Text fontSize="xl" mb={12} color="#666">
          Powerful Essays written by the most advanced AI in the world!
        </Text>
        <Box alignItems={"center"} margin={"20%"} display={"table-row-group"}>
        <TypeEffect />
        </Box>
        <Button onClick={handleSignupOpen} colorScheme="blue" size="lg" mb={8} marginTop={"20%"}>
          Get Started
        </Button>
        <Flex justify="space-between" flexDirection={flexdir}>

            <InfoBox 
            price={"2.99$"}
            info={"5 essays / 2 retries per essay"}ç
            name={"Basic"}
            context={flexdir}
            />
            <InfoBox 
            price={"4.99$"}
            info={"10 essays / 4 retries per essay"}ç
            name={"Standard"}
            context={flexdir}
            />
            <InfoBox 
            price={"8.99$"}
            info={"15 essays / 6 retries per essay"}ç
            name={"Premium"}
            context={flexdir}
            />
        </Flex>

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
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Use</Link>
          <Link href="#">Contact Us</Link>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default LandingPage;




