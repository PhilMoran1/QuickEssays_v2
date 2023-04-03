import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import pako from 'pako';
import html2pdf from 'html2pdf.js';
import { FaFilePdf } from "react-icons/fa";
import { css } from "@emotion/react";

import { decompressString } from "../Components/decompress.mjs";

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
import { fetchEssays } from "../Components/fetch.mjs";
import { updateEssay } from "../Components/fetch.mjs";
import TopBar from "../Components/TopBar/TopBar";
import SummaryDrawer from "./Components/Summary";
import DownloadPdfButton from "./Components/DownloadPdfButton";



const ViewPage = () => {

  
  // function inflateData(compressedData) {
  //   const data = new Uint8Array(compressedData.data);
  //   console.log("DATA - ", data)
  //   const inflated_data = pako.inflate(data);
  //   console.log(inflated_data)
  //   }
  
  
  const downloadFile = (fileContent) => {
    const element = document.createElement("a");
    const file = new Blob([fileContent], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = "example.html";
    document.body.appendChild(element);
    element.click();
  };
  const nav = useNavigate();


  const location = useLocation();
  console.log(location)

  
  const [formData, setFormData] = useState((JSON.parse(location.state.raw_prompt)).prompt);
  console.log(location.state.content)

  const [essay, setEssay] = useState(location.state);
  const [content, setContent] = useState(decompressString(location.state.content));
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [topbarcol, setTopbarcol] = useState("");
  const [topbartop, setTopbartop] = useState("");
  const [loading, setLoading] = useState(false);
  const [sanitized, setSanitized] = useState(DOMPurify.sanitize(decompressString(location.state.content), {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a','h1','h2','h3'],
    ALLOWED_ATTR: ['href']
  }))
  console.log(formData)
  useEffect(()=>{
    setSanitized(DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a','h1','h2','h3'],
      ALLOWED_ATTR: ['href']
    }))
    console.log(sanitized)
  },[content])

  const [usrData, setUsrData] = useState('');
  
  const createPages = () => {
    try {
    console.log(sanitized)
    if (sanitized == undefined) {
      return [];
    }
    let maxPageLength;
    if (isMobile) { maxPageLength = 1500}
    else {maxPageLength = 3000;}
    const words = sanitized.split(" ");
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
  } catch (error) {console.log(error); return [];}
  }

  const handleRetry = async () => {

      if (!usrData) {
        console.log("usrData not defined");
        return;
      }
      setLoading(true)

      console.log("USRDATA - ", usrData)
  
      const token = usrData.token;

        updateEssay(usrData,location.state.id).then((result) => {
          console.log("RESULRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR",result)
          setLoading(false)
          console.log(usrData)
          if (usrData) {
            console.log()
            fetchEssays(usrData).then((result) => {
              console.log(result)
              if (result.status == "error") {
                nav('/') // with message saying session expired
              }
          
              console.log("RESULT - ", result.data)
              const indexed = result.data.reduce((acc, obj) => {
                acc[obj.id] = obj;
                return acc;
              }, {});
              console.log("HEEERE - ",indexed[location.state.id])
              setEssay(indexed[location.state.id]);
              setContent(decompressString(indexed[location.state.id].content))
              setLoading(false)
  
            }).then(() => {
              console.log(content)
              createPages(content)
            }
              ).catch((error) => {console.log(error)})
  
          }

        }).catch((error) => console.log(error))

        

        
    }

  const [p,setP] = useState(createPages(decompressString(location.state.content)));

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("data"));
      console.log(data);
      if (data) {
        setUsrData(data);
      }
      console.log(content)
      const pages = createPages(decompressString([content]));
      setP(pages);
    }, [content]);
    
  console.log(p)

  const PAGE_HEIGHT = "30cm";
  const PAGE_WIDTH = "21cm";


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

    const downloadPdf = () => {
      const html = sanitized; // replace with your HTML string
      const tempElement = document.createElement('div');
      tempElement.innerHTML = html;
      
      const options = {
        filename: `${formData.title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      
      html2pdf().from(tempElement).set(options).save();
    }

    const handleDownload = () => {
      downloadPdf();
    };
  

  return (
    <>
    
    <Box  p={4} position="fixed" top={topbartop} left="0" width="100%" zIndex="1" >
    <TopBar menu={true} bg={topbarcol}/>
    </Box>
    <DownloadPdfButton onDownload={() => handleDownload()} isMobile={isMobile}/>

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
      <SummaryDrawer formData={formData} onRetry={handleRetry} loading={loading} essay={essay}/>
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
