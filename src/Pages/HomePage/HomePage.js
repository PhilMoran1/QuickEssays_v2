import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';
import './HomePage.css'
import {
  Stack,
  Spinner,
  IconButton,
  Text,
  Input,
  Box,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";

import {  FaPlus } from 'react-icons/fa';
import { AiOutlineFile, AiFillFile } from 'react-icons/ai'; 

import { fetchEssays } from "../Components/fetch.mjs";
import Menu from "../Components/Menu/Menu";
import TopBar from "../Components/TopBar/TopBar.js";


function HomePage() {

  const [usrData, setUsrData] = useState('');
  const [essays, setEssays] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredSquares, setFilteredSquares] = useState([{}]);
  const [searchText, setSearchText] = useState('');
  const [showPriceModal, setShowPriceModal] = useState(false)
  const nav = useNavigate();
  
  useEffect(() => { // retrieve user data from localstorage
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data)
    if (data) {
      setUsrData(data);
    }
  }, []);
  
  useEffect(() => {
    if (usrData) { // fetch and set essays
      fetchEssays(usrData).then((result) => {
        console.log(result)
        if (result.status == "error") {
          nav('/') // with message saying session expired
        }
        setEssays(result)
      }).catch((error) => {console.log(error)})
    }
  }, [usrData])
  
  useEffect(() => {
    if (essays) { // check if essays has been set
      try { // generate images and store them in object
        const promises = essays.data.map((essay) => {
          const div = document.createElement('div');
          div.innerHTML = "<html><head><style> body { background-color: white; }</style></head><body>" + essay.content+ "</body></html>";
          return htmlToImage.toPng(div, { width: 800, height: 600 })
            .then(dataUrl => {
              essay.image = dataUrl;
              essay.html = div;
            })
            .catch(error => {
              // Handle errors
              console.log(error)
            });
        });
  
        Promise.all(promises).then(() => {
          console.log("MADE IMAGES here")
  
          setLoading(false)
  
          
        });
  
      } catch (error) { 
        // console.log(error) 
      }
    } else {
    }
  }, [essays])
  
  // useEffect(() => {if (essays != {}) {setShowPriceModal(true)}},[essays])
  
  useEffect(() => {
    try {
      setFilteredSquares(essays.data.filter(square =>
        square.title.toLowerCase().includes(searchText.toLowerCase())
      ))
    } catch (error) {
      //console.log(error)
    }
  },[searchText,loading])


  function handleSearch(event) {
    setSearchText(event);
  }

  const handleEssaySelect = (data) => {
    data.image = 0;
    data.html = 0;
    nav("/view", { state: data })
  }



  return (
    <>
        <Box p={4} >

    <TopBar
    onSearch={(event) => handleSearch(event)}
    searchbar={true}
    showPriceModal={showPriceModal}
      
    />
    </Box>
    {loading ? (
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>

          <Spinner size="xl" />
      </div>
    ) : (
    <Box className="squares-container">

  <Stack direction={{ base: "column", md: "row" }} flexWrap="wrap" justifyContent="center">
    {filteredSquares.map(square => (
      <Box
        key={square.id}
        w={{ base: "100%", md: "25%" }}
        p={2}
        onClick={() => { handleEssaySelect(square) }}
        maxW="400px"
        minW="400px"
      >
        <Box bg="gray.200" p={4} borderRadius="md" position="relative" >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontWeight="bold">{square.title}</Text>
            </Box>
            {square.type === 'basic' && (
              <Box bg="gray.200" p={1} borderRadius="md" mt={2} position="absolute" right={2} top={1}>
                <Text fontSize="sm" color="gray.500">{square.type}</Text>
              </Box>
            )}
            {square.type === 'standard' && (
              <Box bg="gray.700" p={1} borderRadius="md" mt={2} position="absolute" right={2} top={1}>
                <Text fontSize="sm" color="white">{square.type}</Text>
              </Box>
            )}
            {square.type === 'premium' && (
              <Box bg="purple.500" p={1} borderRadius="md" mt={2} position="absolute" right={2} top={1}>
                <Text fontSize="sm" color="white">{square.type}</Text>
              </Box>
            )}
          </Box>
          <Box h="150px" bg="gray.100" borderRadius="md" mt={2} backgroundColor="white" backgroundImage={square.image} backgroundSize="cover" backgroundPosition="center" />
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Box bg="gray.200" p={1} borderRadius="md" display="inline-block">
              <Text fontSize="sm">{new Date(square.last_interaction).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
            </Box>
            <Box display="flex" alignItems="center">
              {square.retries > 0 && (
                <Icon as={AiOutlineFile} color="gray.500" mr={2} />
              )}
              {square.retries <= 0 && (
                <Icon as={AiFillFile} color="green.500" mr={2} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    ))}
  </Stack>
</Box>
                 )}
</>
  );
}

export default HomePage;