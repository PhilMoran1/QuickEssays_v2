import { useEffect, useState,useRef } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  Heading,
  Text,
  FormControl,
  FormLabel,
  SimpleGrid,
  Spinner,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,

} from '@chakra-ui/react';
import { fetchEssays } from '../../Components/fetch.mjs';

function SummaryDrawer(props) {
  // console.log(props.essay.retries)

  const [isDrawerOpen, setIsDrawerOpen] = useState(props.loading);

  const cancelRef = useRef();

  const [showMessage, setShowMessage] = useState(false);
  
  const onClose = () => setShowMessage(false);

  useEffect(()=>{setIsDrawerOpen(props.loading)},[props.loading])
  const toggleDrawer = () => {
    if (!props.loading) {setIsDrawerOpen(!isDrawerOpen)}
    
  };
  const [formData, setFormData] = useState(props.formData)

  return (
    <>
    <AlertDialog
        isOpen={showMessage}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Out of retries</AlertDialogHeader>
            <AlertDialogBody>
              <Text>You dont have any retries left for this essay!</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Ok</Button>
              {/* <Button colorScheme="red" ml={3} onClick={handleContinue}>Continue</Button> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Box id="content-container" mt={20}>
        {/* Your page content here */}
      </Box>

      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        py={2}
        bg="white"
        boxShadow="md"
        textAlign="center"
        
      >
        <Button onClick={toggleDrawer} >Summary</Button>
      </Box>

      <Drawer isOpen={isDrawerOpen} placement="bottom" onClose={toggleDrawer} >
        <DrawerOverlay />
        <DrawerContent>

          <DrawerBody>
            {/* Your summary content here */}

            {!props.loading ? (
                <>

        <Box
          p="4"
          minW="100%"
          minH="560px"
          boxShadow="lg"
          
        //   position="fixed"
          
          top="60px"
          backgroundColor="white"
          marginTop="10%"

        >
        <DrawerCloseButton marginTop="20%"/>

          <Heading size="md" mb="4">
            Summary
          </Heading>
  
            
            <Box mt={8}   textAlign="center" alignItems="center" justifyContent="center" >
            {/* <Heading mb={4}>Summary</Heading> */}
            <SimpleGrid columns={2} spacing={10}>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Text>{formData.title}</Text>
            </FormControl>
            <FormControl>
                <FormLabel>Length</FormLabel>
                <Text>{formData.length}</Text>
            </FormControl>
            <FormControl>
                <FormLabel>Style</FormLabel>
                <Text>{formData.style}</Text>
            </FormControl>
            <FormControl>
                <FormLabel>Tone</FormLabel>
                <Text>{formData.tone}</Text>
            </FormControl>
            <FormControl>
                <FormLabel>Perspective</FormLabel>
                <Text>{formData.perspective}</Text>
            </FormControl>
            <FormControl>
                <FormLabel>Audience</FormLabel>
                <Text>{formData.audience}</Text>
            </FormControl>
            </SimpleGrid>
            <FormLabel>About</FormLabel>
            <Text marginBottom={"20%"}>{formData.about}</Text>
        {props.essay.retries > 0 ? (
          <Button mt={9} colorScheme="blue" width="100%" left="0" bottom="4" position="absolute" onClick={props.onRetry}>Retry , {props.essay.retries} left</Button>
        ) : (
          <Button mt={9} colorScheme="gray" width="100%" left="0" bottom="4" position="absolute" onClick={() => {setShowMessage(true)}}>Retry</Button>
        )}
        </Box>
          
        </Box>
        </>
        ) : (
        <>
        <div style={{  top: 0, right: 0, bottom: 0, left: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>

        <Spinner size="xl" />
        </div>
        </>)}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SummaryDrawer;
