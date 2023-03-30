import { Box, Grid, GridItem } from "@chakra-ui/react";

const Inventory = ({ basic, standard, premium }) => {
  return (
    <Grid templateColumns={`calc(33.33% - ${4}px) repeat(2, calc(33.33% - ${4}px))`} gap={4} textAlign="center" margin={"2%"} paddingRight={"10%"}>
      <GridItem>
        <Box bg="gray.200" p={4} borderRadius={4} minH={"200px"}>
          
          <Box fontSize="85%" mb={4}>
            Basic
          </Box>
          <Box fontSize="2xl" fontWeight="bold" mb={4}>
            {basic}
          </Box>
          {[...Array(basic)].map((_, index) => (
            <Box key={index} bg="gray.400" w={1.5} h={1.5} display="inline-block" mr={1} />
          ))}
        </Box>
      </GridItem>
      <GridItem>
        <Box bg="gray.600" p={4} borderRadius={4} minH={"200px"}>
          <Box fontSize="85%" mb={4} color="white">
            Standard
          </Box>
          <Box fontSize="2xl" fontWeight="bold" mb={4} color="white">
            {standard}
          </Box>
          {[...Array(standard)].map((_, index) => (
            <Box key={index} bg="gray.800" w={1.5} h={1.5}  display="inline-block" mr={1} />
          ))}
        </Box>
      </GridItem>
      <GridItem>
        <Box bg="orange.400" p={4} borderRadius={4} minH={"200px"}>
          <Box fontSize="85%" mb={4} color="white">
            Premium
          </Box>
          <Box fontSize="2xl" fontWeight="bold" mb={4} color="white">
            {premium}
          </Box>
          {[...Array(premium)].map((_, index) => (
            <Box key={index} bg="orange.600" w={1.5} h={1.5} display="inline-block" mr={1} />
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
};


export default Inventory;