import {BsArrowRight, BsArrowDown} from "react-icons/bs";
import { Box } from "@chakra-ui/react";
function Arrow(props) {
    if (!props.isMobile) {
    return (
        <>
        <Box
            height="80px"
            p={2}
            borderRadius="md"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            >
            <Box
                as={BsArrowRight}
                borderRadius={"5px"}
                backgroundColor={"white"}
                size="24px"
                color="gray.600"
            />
            </Box>
        </>
    );
    } else {
        return(
            <>
            <Box
            height="80px"
            p={2}
            borderRadius="md"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            >
            <Box
                as={BsArrowDown}
                borderRadius={"50%"}
                backgroundColor={"white"}
                padding={"2%"}
                size="24px"
                color="gray.600"
            />
            </Box>
        </>
        );
           
    }

}

export default Arrow;