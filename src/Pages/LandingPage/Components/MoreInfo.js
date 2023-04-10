import React, {useState, useEffect} from "react";
import { Box, Flex, Heading, Icon, Text,Grid, GridItem, useEditable } from "@chakra-ui/react";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { FaSave, FaRedo, FaMoneyBillAlt, FaBolt, FaTh, FaCog } from "react-icons/fa";
import { IoMdPaper } from "react-icons/io";
import { IoIosPaper } from "react-icons/io";
import {AiOutlineCreditCard} from "react-icons/ai";
import {BsArrowRight, BsArrowDown} from "react-icons/bs";
import { FaPencilAlt, FaBrain, FaClipboardList } from "react-icons/fa";
import Arrow from "./Arrow";


const MoreInfo = (props) => {

     const boxStyles = {
        height: "250px",
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

      const boxStyles3 = {
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

      const boxStyles2 = {
        height: "250px",
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

      const [arrow, setArrow] = useState()
      const [gridOne, setGridOne] = useState()
      const [gridTwo, setGridTwo] = useState()
      useEffect(() => {
        if (props.isMobile) {
          setArrow(BsArrowDown)
          setGridOne(1)
          setGridTwo(1)
        } else {
          setArrow(BsArrowRight)
          setGridOne(5)
          setGridTwo(3)
        }
      }, [props.isMobile])




  return (
    <>
     
    <Box zIndex={"200"} >
    <Flex alignItems="center" justifyContent="center" >
      <Box maxWidth={"90%"}>
        <Box mb={4}>
          <Heading as="h1" size="2xl" mb={6} color="#FFFF" mt="20">
            Super simple
          </Heading>
        </Box>

        <Flex>
          <Grid templateColumns={`repeat(${gridOne}, 1fr)`} gap={4} alignItems="center" width="100%">
            <GridItem colSpan={1}>
              <Box sx={boxStyles3}>
                <FaUserPlus size={20} />
                <Box mt={2} textAlign="center">
                  Sign Up
                </Box>
              </Box>
            </GridItem>

            <GridItem colSpan={1}>
              <Arrow isMobile={props.isMobile} />
            </GridItem>

            <GridItem colSpan={1}>
              <Box sx={boxStyles3}>
                <AiOutlineCreditCard size={20} />
                <Box mt={2} textAlign="center">
                  Choose a Plan
                </Box>
              </Box>
            </GridItem>

            <GridItem colSpan={1}>
              <Arrow isMobile={props.isMobile} />
            </GridItem>

            <GridItem colSpan={1}>
              <Box sx={boxStyles3}>
                <IoIosPaper size={20} />
                <Box mt={2} textAlign="center">
                  Generate Essay
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Flex>





<Box mb={4}>
  <Heading as="h1" size="2xl" color="#FFFF" mt="20" mb={6} fontWeight={"bold"}>
    Fast, accurate, and reliable AI-generated essays
  </Heading>
</Box>

<Grid
  templateColumns={`repeat(${gridTwo}, 1fr)`}
  gap={4}
  width="100%"
  alignItems="center"
  marginTop={"10%"}
>
  <GridItem colSpan={1}>
    <Box sx={boxStyles2}>
      <FaPencilAlt size={20} />
      <Box mt={2} textAlign="center">
        Easy Writing
      </Box>
      <Text>
        Whether you're a student, a professional, or simply someone who needs to write a lot of essays, our platform has you covered.
      </Text>
    </Box>
  </GridItem>

  <GridItem colSpan={1}>
    <Box sx={boxStyles2}>
      <FaBrain size={20} />
      <Box mt={2} textAlign="center">
        Intelligent Assistance
      </Box>
      <Text>
        With QuickEssays' powerful AI algorithms, you can generate high-quality essays on any topic in just a matter of minutes.
      </Text>
    </Box>
  </GridItem>

  <GridItem colSpan={1}>
    <Box sx={boxStyles2}>
      <FaClipboardList size={20} />
      <Box mt={2} textAlign="center">
        Customization
      </Box>
      <Text>
        Plus, our user-friendly interface makes it easy to customize your essays to meet your specific needs.
      </Text>
    </Box>
  </GridItem>
</Grid>


<Box>
  <Box p={4} mb={8}>
    <Heading as="h1" size="2xl" mb={6} color="#FFFF" mt="20">
      Benefits of using our service
    </Heading>
  </Box>
  <Grid templateColumns={`repeat(${gridTwo}, 1fr)`} gap={4} alignItems="center">
    <GridItem w="100%">
      <Box sx={boxStyles}>
        <FaSave size={20} />
        <Box mt={2} textAlign="center">
          Store your essays
        </Box>
        <Text>
          Save your essays securely and access them anytime, anywhere. With our service, you'll never lose your hard work again.
        </Text>
      </Box>
    </GridItem>
    <GridItem>
      <Box sx={boxStyles}>
        <FaRedo size={20} />
        <Box mt={2} textAlign="center">
          Retry generation
        </Box>
        <Text>
          If you're not satisfied with the essay generated by our AI, you can simply retry the generation process. This ensures that you get the best possible essay for your needs.
        </Text>
      </Box>
    </GridItem>
    <GridItem>
      <Box sx={boxStyles}>
        <FaMoneyBillAlt size={20} />
        <Box mt={2} textAlign="center">
          Affordable
        </Box>
        <Text>
          Our service is designed to be affordable for students. You don't have to break the bank to get high-quality essays written by AI.
        </Text>
      </Box>
    </GridItem>
    <GridItem>
      <Box sx={boxStyles}>
        <FaBolt size={20} />
        <Box mt={2} textAlign="center">
          Fast
        </Box>
        <Text>
          Our AI technology is lightning-fast. You can generate an essay in just minutes, saving you valuable time and allowing you to meet even the tightest deadlines.
        </Text>
      </Box>
    </GridItem>
    <GridItem>
      <Box sx={boxStyles}>
        <FaTh size={20} />
        <Box mt={2} textAlign="center">
          Organized
        </Box>
        <Text>
          Keep your essays organized with our service. You can easily search and filter your essays by topic, date, or other criteria, making it easy to find what you need when you need it.
        </Text>
      </Box>
    </GridItem>
    <GridItem>
      <Box sx={boxStyles}>
        <FaCog size={20} />
        <Box mt={2} textAlign="center">
          Customizable
        </Box>
        <Text>
          Our service allows you to customize your essays to meet your specific needs. You can adjust the length, tone, and style of your essay to ensure that it meets your requirements perfectly.
        </Text>
      </Box>
    </GridItem>
  </Grid>
</Box>
</Box>
</Flex>
</Box>
    </>
  );
};

export default MoreInfo;






//       ) : (
//       <>
        
     
//     <Box marginTop={"20%"} marginBottom={"20%"}>
//       <Flex alignItems="center" justifyContent="center" height="100vh">
//         <Box maxWidth="800px">
//           <Box mb={4}>
//           <Heading as="h1" size="2xl" mb={6} color="#4d4d4d" mt="20">
//           Super simple
//         </Heading>
//           </Box>
//           <Flex >
//            <Grid templateColumns="repeat(1, 1fr)" gap={4} alignItems="center" width="100%">
//   <GridItem colSpan={1}>
//     <Box sx={boxStyles}>
//       <FaUserPlus size={20} />
//       <Box mt={2} textAlign="center">
//         Sign Up
//       </Box>
//     </Box>
//   </GridItem>
//   <GridItem colSpan={1}>
//     <Box
//       height="80px"
//     //   backgroundColor="white"
//       p={2}
//     //   boxShadow="md"
//       borderRadius="md"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       width="100%"
//     >
//       <Box
//         as={BsArrowDown}
//         size="24px"
//         color="gray.600"
//       />
//     </Box>
//   </GridItem>
//   <GridItem colSpan={1}>
//     <Box sx={boxStyles}>
//       <AiOutlineCreditCard size={20} />
//       <Box mt={2} textAlign="center">
//         Choose a Plan
//       </Box>
//     </Box>
//   </GridItem>
//   <GridItem colSpan={1}>
//     <Box
//       height="80px"
//     //   backgroundColor="white"
//       p={2}
//     //   boxShadow="md"
//       borderRadius="md"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       width="100%"
//     >
//       <Box
//         as={BsArrowDown}
//         size="24px"
//         color="gray.600"
//       />
//     </Box>
//   </GridItem>
  
//   <GridItem colSpan={1}>
//     <Box sx={boxStyles}>
//       <IoIosPaper size={20} />
//       <Box mt={2} textAlign="center">
//         Generate Essay
//       </Box>
//     </Box>
//   </GridItem>
// </Grid>

//               </Flex>
//           <Box p={4} mb={8}>
//             <Heading as="h1" size="2xl" mb={6} color="#4d4d4d" mt="20">
//               Benefits of using our service
//             </Heading>
//           </Box>
//           <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="center">
//       <GridItem w="100%">
//         <Box
//          sx={boxStyles}
//         >
//           <FaSave size={20} />
//           <Box mt={2} textAlign="center">
//             Store your essays
//           </Box>
//         </Box>
//       </GridItem>
//       <GridItem>
//         <Box
//           sx={boxStyles}
//         >
//           <FaRedo size={20} />
//           <Box mt={2} textAlign="center">
//             Retry generation
//           </Box>
//         </Box>
//       </GridItem>
//       <GridItem>
//         <Box
//          sx={boxStyles}
//         >
//           <FaMoneyBillAlt size={20} />
//           <Box mt={2} textAlign="center">
//             Affordable
//           </Box>
//         </Box>
//       </GridItem>
//       <GridItem>
//         <Box
//           sx={boxStyles}
//         >
//           <FaBolt size={20} />
//           <Box mt={2} textAlign="center">
//             Fast
//           </Box>
//         </Box>
//       </GridItem>
//       <GridItem>
//         <Box
//           sx={boxStyles}
//         >
//           <FaTh size={20} />
//           <Box mt={2} textAlign="center">
//             Organised
//           </Box>
//         </Box>
//       </GridItem>
//       <GridItem>
//         <Box
//           sx={boxStyles}
//         >
//           <FaCog size={20} />
//           <Box mt={2} textAlign="center">
//             Customizable
//           </Box>
//         </Box>
//       </GridItem>
//     </Grid>
//         </Box>
//       </Flex>
//       <br />
//       <br />

//       <br />

//     </Box>
//       </>
      
//     )}
    // </>


