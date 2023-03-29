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

        <Button colorScheme="blue" size="md">
            {props.name}
        </Button>

        </Box>
        </>
    );
}

export default InfoBox;