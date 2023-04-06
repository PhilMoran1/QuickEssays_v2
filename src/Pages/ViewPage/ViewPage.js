import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import DOMPurify from 'dompurify';
import pako from 'pako';
import html2pdf from 'html2pdf.js';
import { FaFilePdf } from "react-icons/fa";
import { css } from "@emotion/react";
import ReactPaginate from 'react-paginate';

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
  Image,
  Spinner
} from "@chakra-ui/react";

import { RiHome2Line } from "react-icons/ri";
import { FaThumbsDown, FaThumbsUp } from"react-icons/fa";
import Menu from "../Components/Menu/Menu";
import { fetchEssays, updateEssayFeedBack } from "../Components/fetch.mjs";
import { updateEssay } from "../Components/fetch.mjs";
import TopBar from "../Components/TopBar/TopBar";
import SummaryDrawer from "./Components/Summary";
import DownloadPdfButton from "./Components/DownloadPdfButton";
import ViewPagePopUp from "./Components/ViewPagePopUp.js";
import Pages from "./Components/Pages.js";


const ViewPage = () => {

  // State variables
  const nav = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState((JSON.parse(location.state.raw_prompt)).prompt);
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
  const [showMessage, setShowMessage] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [usrData, setUsrData] = useState('');
  const [p,setP] = useState(createPages(decompressString(location.state.content)));
  const PAGE_HEIGHT = "30cm";
  const PAGE_WIDTH = "21cm";


  // Effects
  useEffect(() => {
    const pages = createPages(decompressString(content));
    setP(pages);
  }, [content, sanitized]);
  
  
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

useEffect(() => {
  const data = JSON.parse(localStorage.getItem("data"));
  if (data) {
    setUsrData(data);
  }
  const pages = createPages(decompressString([content]));
  setP(pages);
}, [content]);

useEffect(() => {
  function handleResize() {
    setIsMobile(window.innerWidth < 768);
  }
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

useEffect(() => {
  if (isMobile) {
    setTopbarcol("white")
    setTopbartop("-4")
  } else {
    setTopbarcol("")
    setTopbartop("")  
  }
}, [isMobile]);

useEffect(() => { 
  if (essay.feedback == "1") {
    setLiked(true); 
    setDisliked(false);
  } else if (essay.feedback == "-1") {
    setLiked(false); 
    setDisliked(true);
  }
}, [essay]);

useEffect(() => {
  setSanitized(DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a','h1','h2','h3'],
    ALLOWED_ATTR: ['href']
  }))
},[content]);

 
    
    
  // Functions

  function createPages() {
    try {
      if (sanitized == undefined) {
        return [];
      }
      console.log(sanitized)
  
      let maxPageLength;
      if (isMobile) { maxPageLength = 1500}
      else {maxPageLength = 3500;}
      const words = sanitized.split(" ");
      let currentPage = 1;
      let currentPageContent = "";
      const pages = [];
  
      let pCount = 0; // initialize p count to 0
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const newContent = currentPageContent + word + " ";
  
        if (word === "</p>") {
          pCount++;
        }
  
        if (pCount > 0 && pCount % 3 === 0) { // check if fourth </p> has been reached
          pages.push(currentPageContent); // push current content to pages array
          currentPageContent = ""; // reset current content
          currentPage++; // increment current page
          pCount = 0; // reset p count
        } else {
          currentPageContent = newContent;
        }
      }
  
      if (currentPageContent !== "") {
        pages.push(currentPageContent);
      }
  
      return pages;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  
  const handleRetry = async () => {
    if (!usrData) {
      return;
    }
    setLoading(true);
  
    const token = usrData.token;
  
    updateEssay(usrData, location.state.id).then((result) => {
      setLoading(false);
      if (usrData) {
        fetchEssays(usrData)
          .then((result) => {
            if (result.status == "error") {
              nav("/"); // with message saying session expired
            }
  
            const indexed = result.data.reduce((acc, obj) => {
              acc[obj.id] = obj;
              return acc;
            }, {});
            setEssay(indexed[location.state.id]);
            setContent(decompressString(indexed[location.state.id].content));
            setLoading(false);
            const decompressed_content = decompressString(indexed[location.state.id].content);
            setDisliked(indexed[location.state.id] === -1);
            setLiked(indexed[location.state.id] === 1);

            setP(createPages(decompressed_content));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  

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

  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
    updateEssayFeedBack(essay.id, "1").then(() => {}).catch((error)=>{console.log(error)})

  };

  const handleDislike = () => {
    setDisliked(true);
    setLiked(false);
    updateEssayFeedBack(essay.id, "-1").then(() => {}).catch((error)=>{console.log(error)})
  };


  return (
    <>

    <ViewPagePopUp showMessage={showMessage} onClose={() => {setShowMessage(false)}}/>
     {loading && !isMobile && (
      <>
<div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(0, 0, 0, 0.5)", zIndex: "9999999999" }}>

      <Spinner size="xl" />
      </div>
      </>)}
    <Box  p={4} position="fixed" top={topbartop} left="0" width="100%" zIndex="1" >
    <TopBar menu={true} bg={topbarcol}/>
    </Box>
    
    <Flex
  position="fixed"
  bottom="60px"
  right="20px"
  alignItems="center"
  spacing={5}
>
  <DownloadPdfButton onDownload={handleDownload} isMobile={isMobile} />
  <IconButton
    icon={<FaThumbsUp />}
    aria-label="like button"
    onClick={handleLike}
    colorScheme={liked ? "blue" : undefined}
    borderRadius="full"
    ml={2}

  />
  <IconButton
    icon={<FaThumbsDown />}
    aria-label="dislike button"
    onClick={handleDislike}
    colorScheme={disliked ? "blue" : undefined}
    borderRadius="full"
    ml={2}

  />
</Flex>
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
            {essay.retries > 0 ? (
          <Button mt={9} colorScheme="blue" width="100%" left="0" bottom="4" position="absolute" onClick={handleRetry}>Retry, {essay.retries} left</Button>
          ) : (
          <Button mt={9} colorScheme="gray" width="100%" left="0" bottom="4" position="absolute" onClick={() => {setShowMessage(true)}}>Retry</Button>
        )}
        </Box>
          
        </Box>
      </Box>

      <Box flex="3">
  
    <Box id="content-container" mt={20} >
 
  {p.map((pageContent, index) => (
    <Box
      key={index}
      className="page"
      minH={PAGE_HEIGHT}
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
  {/* <Pages pages={p}></Pages> */}
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
            minH={PAGE_HEIGHT}
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
