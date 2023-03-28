import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { RiHome2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import Menu from "../Menu/Menu";
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

  return (
    <>
      {/* Top bar */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">

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
        )};

        {/* Logo and Image */}
        <Flex alignItems="center" justifyContent="start" left="20" position="absolute">
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
        <Menu />
      </Stack>
    </>
  );

}
export default TopBar;