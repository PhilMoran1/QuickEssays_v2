import { useState, useRef } from "react";
import 
{AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
} from "@chakra-ui/react";
import { Text, Button } from "@chakra-ui/react";

function ViewPagePopUp(props) {
    
  const cancelRef = useRef();

//   const [showMessage, setShowMessage] = useState(false);
  
  const onClose = () => props.onClose();
  return (
  <>
  <AlertDialog
        isOpen={props.showMessage}
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
  </>
  )

}

export default ViewPagePopUp;