import React from "react";
import { Box, Flex, Heading, Icon, Text,Grid, GridItem } from "@chakra-ui/react";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { FaSave, FaRedo, FaMoneyBillAlt, FaBolt, FaTh, FaCog } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import { IoIosPaper } from "react-icons/io";
import {AiOutlineCreditCard} from "react-icons/ai";
import {BsArrowRight, BsArrowDown} from "react-icons/bs";

const MoreInfo = (props) => {

     const boxStyles = {
        height: "80px",
        backgroundColor: "white",
        p: 2,
        boxShadow: "md",
        borderRadius: "md",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      };
      
       const iconStyles = {
        size: 20,
      };
  return (
    <>
    {!props.isMobile ? (
      <>
      
     
    <Box>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box maxWidth="800px">
          <Box mb={4}>
          <Heading as="h1" size="2xl" mb={6} color="#4d4d4d" mt="20">
          Super simple
        </Heading>
          </Box>
          <Flex >
           <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center" width="100%">
  <GridItem colSpan={1}>
    <Box sx={boxStyles}>
      <FaUserPlus size={20} />
      <Box mt={2} textAlign="center">
        Sign Up
      </Box>
    </Box>
  </GridItem>
  <GridItem colSpan={1}>
    <Box
      height="80px"
    //   backgroundColor="white"
      p={2}
    //   boxShadow="md"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box
        as={BsArrowRight}
        size="24px"
        color="gray.600"
      />
    </Box>
  </GridItem>
  <GridItem colSpan={1}>
    <Box sx={boxStyles}>
      <AiOutlineCreditCard size={20} />
      <Box mt={2} textAlign="center">
        Choose a Plan
      </Box>
    </Box>
  </GridItem>
  <GridItem colSpan={1}>
    <Box
      height="80px"
    //   backgroundColor="white"
      p={2}
    //   boxShadow="md"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box
        as={BsArrowRight}
        size="24px"
        color="gray.600"
      />
    </Box>
  </GridItem>
  
  <GridItem colSpan={1}>
    <Box sx={boxStyles}>
      <IoIosPaper size={20} />
      <Box mt={2} textAlign="center">
        Generate Essay
      </Box>
    </Box>
  </GridItem>
</Grid>

              </Flex>
          <Box p={4} mb={8}>
            <Heading as="h1" size="2xl" mb={6} color="#4d4d4d" mt="20">
              Benefits of using our service
            </Heading>
          </Box>
          <Grid templateColumns="repeat(3, 1fr)" gap={4} alignItems="center">
      <GridItem w="100%">
        <Box
         sx={boxStyles}
        >
          <FaSave size={20} />
          <Box mt={2} textAlign="center">
            Store your essays
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          sx={boxStyles}
        >
          <FaRedo size={20} />
          <Box mt={2} textAlign="center">
            Retry generation
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
         sx={boxStyles}
        >
          <FaMoneyBillAlt size={20} />
          <Box mt={2} textAlign="center">
            Affordable
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          sx={boxStyles}
        >
          <FaBolt size={20} />
          <Box mt={2} textAlign="center">
            Fast
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          sx={boxStyles}
        >
          <FaTh size={20} />
          <Box mt={2} textAlign="center">
            Organised
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          sx={boxStyles}
        >
          <FaCog size={20} />
          <Box mt={2} textAlign="center">
            Customizable
          </Box>
        </Box>
      </GridItem>
    </Grid>
        </Box>
      </Flex>
      <br />
      <br />

      <br />

    </Box>
    </>







      ) : (
      <>
        
     
    <Box marginTop={"20%"} marginBottom={"20%"}>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box maxWidth="800px">
          <Box mb={4}>
          <Heading as="h1" size="2xl" mb={6} color="#4d4d4d" mt="20">
          Super simple
        </Heading>
          </Box>
          <Flex >
           <Grid templateColumns="repeat(1, 1fr)" gap={4} alignItems="center" width="100%">
  <GridItem colSpan={1}>
    <Box sx={boxStyles}>
      <FaUserPlus size={20} />
      <Box mt={2} textAlign="center">
        Sign Up
      </Box>
    </Box>
  </GridItem>
  <GridItem colSpan={1}>
    <Box
      height="80px"
    //   backgroundColor="white"
      p={2}
    //   boxShadow="md"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box
        as={BsArrowDown}
        size="24px"
        color="gray.600"
      />
    </Box>
  </GridItem>
  <GridItem colSpan={1}>
    <Box sx={boxStyles}>
      <AiOutlineCreditCard size={20} />
      <Box mt={2} textAlign="center">
        Choose a Plan
      </Box>
    </Box>
  </GridItem>
  <GridItem colSpan={1}>
    <Box
      height="80px"
    //   backgroundColor="white"
      p={2}
    //   boxShadow="md"
      borderRadius="md"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box
        as={BsArrowDown}
        size="24px"
        color="gray.600"
      />
    </Box>
  </GridItem>
  
  <GridItem colSpan={1}>
    <Box sx={boxStyles}>
      <IoIosPaper size={20} />
      <Box mt={2} textAlign="center">
        Generate Essay
      </Box>
    </Box>
  </GridItem>
</Grid>

              </Flex>
          <Box p={4} mb={8}>
            <Heading as="h1" size="2xl" mb={6} color="#4d4d4d" mt="20">
              Benefits of using our service
            </Heading>
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="center">
      <GridItem w="100%">
        <Box
         sx={boxStyles}
        >
          <FaSave size={20} />
          <Box mt={2} textAlign="center">
            Store your essays
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          sx={boxStyles}
        >
          <FaRedo size={20} />
          <Box mt={2} textAlign="center">
            Retry generation
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
         sx={boxStyles}
        >
          <FaMoneyBillAlt size={20} />
          <Box mt={2} textAlign="center">
            Affordable
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          sx={boxStyles}
        >
          <FaBolt size={20} />
          <Box mt={2} textAlign="center">
            Fast
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          sx={boxStyles}
        >
          <FaTh size={20} />
          <Box mt={2} textAlign="center">
            Organised
          </Box>
        </Box>
      </GridItem>
      <GridItem>
        <Box
          sx={boxStyles}
        >
          <FaCog size={20} />
          <Box mt={2} textAlign="center">
            Customizable
          </Box>
        </Box>
      </GridItem>
    </Grid>
        </Box>
      </Flex>
      <br />
      <br />

      <br />

    </Box>
      </>
      
    )}
    </>
  );
};

export default MoreInfo;

