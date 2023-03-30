import { useState, useEffect } from "react";
import {
    Box,
    Text,
    Button
} from '@chakra-ui/react';

function InfoBox(props) {

    const [width, setWidth] = useState("30%");
    useEffect(() => {if (props.context != "") {setWidth("100%")}}, [props.context])

    console.log("HERE")

    return(
        <>
        <Box
            bg="#fff"
            p={6}
            boxShadow="md"
            borderRadius="md"
            width={width}
            textAlign="center"
            margin="2%"
          >
            
        <Text fontSize="lg" mb={6}>
            {props.price}
        </Text>

        <Text mb={6}>{props.info}</Text>
        {props.name === 'Basic' && (
              <Box bg="gray.200" p={1} borderRadius="md">
                <Text color="gray.500">{props.name}</Text>
              </Box>
            )}
            {props.name === 'Standard' && (
              <Box bg="gray.700" p={1} borderRadius="md">
                <Text color="white">{props.name}</Text>
              </Box>
            )}
            {props.name === 'Premium' && (
              <Box bg="orange.400" p={1} borderRadius="md">
                <Text color="white">{props.name}</Text>
              </Box>
            )}
        {/* <Button colorScheme="blue" size="md">
            {props.name}
        </Button> */}
        

        </Box>
        </>
    );
}

export default InfoBox;