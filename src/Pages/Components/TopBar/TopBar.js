import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { RiHome2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Menu from "../Menu/Menu";
import './TopBar.css'
import {
  Flex,
  Text,
  Stack,
  IconButton,
  Input,
  Image
} from "@chakra-ui/react";

function TopBar(props) {
  const nav = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    props.onSearch(event.target.value);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div style={{backgroundColor: props.bg, top: 0, padding: 0}}>

      {/* Top bar */}
      {isMobile && (
          <Flex alignItems="center" top={0}>
          <Image src="profilepic.jpg" alt="Logo" borderRadius="50%" boxSize="40px" ml="2" />
          <Text
            fontSize="150%"
            fontWeight="bold"
            color="#4d4d4d"
            ml="2"
          >
            Quickessays
          </Text>
          <Stack />
        </Flex>
        
        )}
      <Stack direction="row" alignItems="center" justifyContent="space-between" margin="0.5%">
        
        {props.menu == true ? (
          <IconButton
            aria-label="Menu"
            icon={<RiHome2Line />}
            size="md"
            variant="outline"
            onClick={() => {
              nav("/home");
            }}
            backgroundColor="white"
          />
        ) : (
          <IconButton
            aria-label="Add item"
            icon={<FaPlus />}
            size="md"
            variant="outline"
            onClick={() => { nav("/create") }}
          />
        )}

        {/* Logo and Image */}
        {!isMobile && (
        <Flex className="logo-wrapper" alignItems="center" justifyContent="start" left="20" position="absolute">
          <Image src="profilepic.jpg" alt="Logo" borderRadius="50%" boxSize="40px" ml="2" />
          <Text
            fontSize="150%"
            fontWeight="bold"
            color="#4d4d4d"
            ml="2"
          >
            Quickessays
          </Text>
        </Flex>
        )}

        {/* {!isMobile && (
          //
        )} */}

        {/* Search bar */}
        {props.searchbar == true && (
          <Input
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            size="md"
            maxWidth="md"
          />)
        }
        
        {/* Right button */}
        <Menu showPriceModal={props.showPriceModal}/>
      </Stack>
      {/* <Stack direction="row" h="1px" bg="gray.300" mt={2} /> */}

    </div>
  );

}
export default TopBar;