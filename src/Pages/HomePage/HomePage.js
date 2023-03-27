import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';

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


function HomePage() {

  const [usrData, setUsrData] = useState('');
  const [essays, setEssays] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredSquares, setFilteredSquares] = useState([{},{}]);
  const [searchText, setSearchText] = useState('');
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
    }
  }, [essays])
  

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
    setSearchText(event.target.value);
  }

  const handleEssaySelect = (data) => {
    data.image = 0;
    data.html = 0;
    nav("/view", { state: data })
  }



  return (
    
    <Box p={4}>
      {/* Top bar */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Left button */}
        <IconButton
          aria-label="Add item"
          icon={<FaPlus />}
          size="md"
          variant="outline"
          onClick={() => {nav("/create")}}
        />
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="#4d4d4d"
          position="absolute"
          top="4"
          left="20"
          width="20%"
        >
          Quickessays
        </Text>

        {/* Search bar */}
        <Input
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          size="md"
          maxWidth="md"
        />
        {/* Right button */}
        <Menu/>
      </Stack>

    {/* Array of squares */}
    {loading ? (
                   <Spinner size="xl" />
                 ) : (
    <Stack direction="row" flexWrap="wrap" mt={4} justifyContent="center">
  {filteredSquares.map(square => (
    <Box key={square.id} w="25%" p={2}  onClick={() => { handleEssaySelect(square) }}>
      <Box bg="gray.200" p={4} borderRadius="md" position="relative">
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
        <Box h="150px" bg="gray.100" borderRadius="md" mt={2} backgroundColor="white" backgroundImage={square.image} backgroundSize="cover" backgroundPosition="center"/>
      
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box bg="gray.200" p={1} borderRadius="md" display="inline-block">
            <Text fontSize="sm">{new Date(square.last_interaction).toLocaleString('en-US',{year: 'numeric', month: 'long', day: 'numeric' })}</Text>
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
</Stack>)}




    </Box>
  );
}

export default HomePage;