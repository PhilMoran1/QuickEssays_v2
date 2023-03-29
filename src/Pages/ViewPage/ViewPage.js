import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './ViewPage.css'
import {
  Flex,
  Box,
  useDisclosure,
  Heading,
  Button,
  Text,
  Stack,
  IconButton,
  FormControl,
  FormLabel,
  SimpleGrid,
  Input,
  Image
} from "@chakra-ui/react";

import { RiHome2Line } from "react-icons/ri";

import Menu from "../Components/Menu/Menu";
import { fetchEssays } from "../Components/fetch";
import { updateEssay } from "../Components/fetch.mjs";
import TopBar from "../Components/TopBar/TopBar";


const ViewPage = () => {

  const nav = useNavigate();


  const location = useLocation();
  console.log(location)

  
  const [formData, setFormData] = useState((JSON.parse(location.state.raw_prompt)).prompt);
  const [content, setContent] = useState(location.state.content);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [topbarcol, setTopbarcol] = useState("");
  const [topbartop, setTopbartop] = useState("");


  console.log(formData)

  const sanitizedHtml = DOMPurify.sanitize(location.state.content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href']
  });


  const [usrData, setUsrData] = useState('');
  
  const createPages = () => {
    console.log(content)
    let maxPageLength;
    if (isMobile) { maxPageLength = 1500}
    else {maxPageLength = 3000;}
    const words = content.split(" ");
    let currentPage = 1;
    let currentPageContent = "";
    const pages = [];

    for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const newContent = currentPageContent + word + " ";
    if (newContent.length > maxPageLength) {
        pages.push(currentPageContent);
        currentPageContent = word + " ";
        currentPage++;
    } else {
        currentPageContent = newContent;
    }
    }

    pages.push(currentPageContent);
    console.log(content)
    console.log(pages)
    return pages; //setP(pages)
  }

  const handleRetry = async () => {

      if (!usrData) {
        console.log("usrData not defined");
        return;
      }

      console.log("USRDATA - ", usrData)
  
      const token = usrData.token;

        updateEssay(usrData,location.state.id).then((result) => {
          console.log(result)
        }).catch((error) => console.log(error))

        if (usrData) {
          console.log()
          fetchEssays(usrData).then((result) => {
            console.log(result)
            if (result.status == "error") {
              nav('/') // with message saying session expired
            }
        
            console.log(result.data)

            setContent(result.data[0].content)

          }).then(() => {
            console.log(content)
            createPages(content)
          }
            ).catch((error) => {console.log(error)})

        }

        
    }

  const [p,setP] = useState(createPages(location.state.content));

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("data"));
      console.log(data);
      if (data) {
        setUsrData(data);
      }
      const pages = createPages(content);
      setP(pages);
    }, [content]);
    

  const PAGE_HEIGHT = "30cm";
  const PAGE_WIDTH = "21cm";

  console.log(p)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
      console.log(isMobile)
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setTopbarcol("white")
      setTopbartop("-4")
    }
     else {
      setTopbarcol("")
      setTopbartop("")
    
    }}, [isMobile])

  return (
    <>
    <Box  p={4} position="fixed" top={topbartop} left="0" width="100%" zIndex="1" >
    <TopBar menu={true} bg={topbarcol}/>
    </Box>

    {!isMobile ? (
      
      <Flex px="8" py="4" height="100vh" alignItems="flex-start" >
        
        
      <Box flex="1" >
        <Box
          p="4"
          maxW="30%"
          minH="560px"
          boxShadow="lg"
          
          position="fixed"
          
          top="60px"
          backgroundColor="white"
        >
          <Heading size="md" mb="4">
            Summary
          </Heading>
  
            
            <Box mt={8}   textAlign="center" alignItems="center" justifyContent="center" >
            {/* <Heading mb={4}>Summary</Heading> */}
            <SimpleGrid columns={3} spacing={10}>
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
            <Text>{formData.about}</Text>

        <Button mt={9} colorScheme="blue" width="100%" left="0" bottom="4" position="absolute" onClick={handleRetry}>Retry</Button>
        </Box>
          
        </Box>
      </Box>

      <Box flex="3">
  
    <Box id="content-container" mt={20} >
  {p.map((pageContent, index) => (
    <Box
      key={index}
      className="page"
      height={PAGE_HEIGHT}
      width={PAGE_WIDTH}
      
      marginLeft="10%"
      marginRight="5%"
      overflow="hidden"
      mb="2"
      backgroundColor="white"
      boxShadow="lg"
    >
      <Box p="4" dangerouslySetInnerHTML={{ __html: pageContent }} />
    </Box>
  ))}
</Box>
</Box> 



    </Flex>
    ): (
      <>
       <Box id="content-container" mt={20} >
        {p.map((pageContent, index) => (
          <Box
            key={index}
            className="page"
            minHeight={PAGE_HEIGHT}
            width="100%"
            overflow="hidden"
            mb="2"
            backgroundColor="white"
            boxShadow="lg"
          >
            <Box p="4" dangerouslySetInnerHTML={{ __html: pageContent }} />
          </Box>
        ))}
      </Box>
      </>
    )}
    </>
    
  );
};

export default ViewPage;



{/* <Box
    p="4"
    maxW="100%"
    minH="1120px"
    mx="auto"
    my="0"
    // position="relative"
    boxShadow="lg"
    // margin="5%"
    marginLeft="10%"
    marginRight="5%"
    backgroundColor={"blue"}

    // Add the following styles to make the box scrollable
    overflow="auto"
    height="1120px"
  >
    <Heading size="md" mb="4">
      Essay Preview
    </Heading>
    
    {location.state.content.split(/(.{1000})/).filter(Boolean).map((page, index) => (
      <Box key={index} mt={index !== 0 && 6} p={6} border="1px solid black">
        <Text fontWeight="bold" mb={2}>Page {index + 1}</Text>
        <Text>{page}</Text>
      </Box>
    ))}
  </Box> */}
  {/* <Box
      p="4"
      maxW={PAGE_WIDTH}
      h={PAGE_HEIGHT}
      mx="auto"
      my="0"
      // position="relative"
      boxShadow="lg"
      // margin="5%"
      marginLeft="10%"
      marginRight="5%"
      // backgroundColor={"white"}
      overflow="hidden"
      overflowY="scroll"
      fontSize={"16px"}
    >
      {pages.map((page, index) => (
        <Box inherit="none" key={index} h={PAGE_HEIGHT} w={PAGE_WIDTH} backgroundColor="blue" overflow="hidden" dangerouslySetInnerHTML={{ __html: page }} />

        
      ))}
    </Box>*/}
