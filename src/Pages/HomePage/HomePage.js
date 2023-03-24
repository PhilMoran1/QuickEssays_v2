import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as htmlToImage from 'html-to-image';

import {
  Stack,
  IconButton,
  Text,
  Input,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";



import { FaBars, FaPlus, FaCog, FaDollarSign, FaQuestionCircle } from 'react-icons/fa';
import { AiOutlineFile, AiFillFile, AiOutlineRobot,AiOutlineCloud,AiOutlineDashboard } from 'react-icons/ai'; 
import { FaFileAlt, FaFile, FaEdit, FaPencilAlt } from 'react-icons/fa';

import { Link } from 'react-router-dom';

import HelpModal from "../Components/Menu/Components/HelpModal";
import PricingModal from "../Components/Menu/Components/PricingModal";
import SettingsModal from "../Components/Menu/Components/SettingsModal";

// import Menu from "../Components/Menu/Menu";
import ImageGenerator from '../Components/ImageGenerator/ImageGenerator'
import { fetchEssays } from "../Components/fetch";


function HomePage() {

  const [usrData, setUsrData] = useState('');
  const [essays, setEssays] = useState({});
  const [renderedEssays, setRenderedEssays] = useState(false);

  

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data)
    if (data) {
      setUsrData(data);
    }
  }, []);
  
  useEffect(() => {
    if (usrData) {
      fetchEssays(usrData).then((result) => {
        if (result.status == "error") {
          nav('/') // with message saying session expired
        }
        setEssays(result)
      }).catch((error) => {console.log(error)})
    }
  }, [usrData]);

  useEffect(() => {
    if (Object.keys(essays).length > 0) {
      setRenderedEssays(false);
    }
  }, [essays]);

  useEffect(() => {
    console.log("HELLO MAKING IMAGES")
    if (!renderedEssays && Object.keys(essays).length > 0) {
      const updatedEssays = {...essays};
      const promises = updatedEssays.data.map((essay, index) => {
        return new Promise((resolve, reject) => {
          const div = document.createElement('div');
          div.innerHTML = "<html><head><style> body { background-color: white; }</style></head><body>" + essay.content+ "</body></html>";
          htmlToImage.toPng(div, { width: 800, height: 600 })
            .then(dataUrl => {
              updatedEssays.data[index].image = dataUrl;
              updatedEssays.data[index].html = div;
              resolve();
            })
            .catch(error => {
              console.log(error);
              reject();
            });
        });
      });
      Promise.all(promises).then(() => {
        setEssays(updatedEssays);
        setRenderedEssays(true);
      }).catch((error) => {console.log(error)});
    }
  }, [essays, renderedEssays]);

  // useEffect(() => {
  //   if (usrData) {
  //     fetchEssays(usrData).then((result) => {
  //       console.log(result)
  //       if (result.status == "error") {
  //         nav('/') // with message saying session expired
  //       }
    
  //       setEssays(result)
      
  //     }).catch((error) => {console.log(error)})
  //   }
  // }, [usrData]);

  // useEffect(() => {
  //   //console.log(essays)
  //   try {
  //     for (let i = 0; i < essays.data.length; i++) {
        
  //       const div = document.createElement('div');
  //       div.innerHTML = "<html><head><style> body { background-color: white; }</style></head><body>" + essays.data[i].content+ "</body></html>";
  //       //console.log(div)
  //       htmlToImage.toPng(div, { width: 800, height: 600 })
  //         .then(dataUrl => {
  //           //console.log(dataUrl)
  //           essays.data[i].image = dataUrl;
  //           essays.data[i].html = div;
  //           //console.log(essays)
  //           // Do something with the data URL
  //         })
  //         .catch(error => {
  //           // Handle errors
  //           console.log(error)
  //         });
  //     }
  //   } catch (error) { console.log(error) }

  //   setTest(true)
  // }, [usrData,essays])
  
  
  // ImageGenerator("<h1>HELLO</h1>",5)

  const nav = useNavigate();

  const [searchText, setSearchText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSearch(event) {
    setSearchText(event.target.value);
  }

    let filteredSquares = [{},{}]
    try {
      filteredSquares = essays.data.filter(square =>
      square.title.toLowerCase().includes(searchText.toLowerCase())
    );
      } catch {

      }

  

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const openSettingsModal = () => setIsSettingsOpen(true);
  const closeSettingsModal = () => setIsSettingsOpen(false);
  const openPricingModal = () => setIsPricingOpen(true);
  const closePricingModal = () => setIsPricingOpen(false);
  const openHelpModal = () => setIsHelpOpen(true);
  const closeHelpModal = () => setIsHelpOpen(false);
  

  const [data, setData] = useState({})
  const handleEssaySelect = (data) => {
    data.image = 0;
    data.html = 0;
    nav("/view", { state: data })
  }

  const [test,setTest] = useState(false);


  return (
    
    <Box p={4}>
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettingsModal} />
      <PricingModal isOpen={isPricingOpen} onClose={closePricingModal} />
      <HelpModal isOpen={isHelpOpen} onClose={closeHelpModal} />
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
        <IconButton
          aria-label="Menu"
          icon={<FaBars />}
          size="md"
          variant="outline"
          onClick={onOpen}
        />
      </Stack>

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="white" color="gray.700">
          <DrawerCloseButton />
          <Text fontSize="xl" fontWeight="bold" mt={4} mb={8}>
            Menu
          </Text>
          <Stack spacing={4} pl={4}>
            <Button variant="ghost" leftIcon={<FaCog />} onClick={() => setIsSettingsOpen(true)}>
              Settings
            </Button>
            <Button variant="ghost" leftIcon={<FaDollarSign />} onClick={() => setIsPricingOpen(true)}>
              Price
            </Button>
            <Button variant="ghost" leftIcon={<FaQuestionCircle />} onClick={() => setIsHelpOpen(true)}>
              Help
            </Button>
            <Box pt={8} display="flex" justifyContent="center" alignItems="flex-end" bottom={0}>
              <Link to="/privacy">Privacy Policy ·  </Link>
              <Link to="/terms"> Terms of Service</Link>
            </Box>
          </Stack>
        </DrawerContent>
      </Drawer>
    {/* Array of squares */}
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
</Stack>




    </Box>
  );
}

export default HomePage;