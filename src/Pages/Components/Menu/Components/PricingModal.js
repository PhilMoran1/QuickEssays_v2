import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Payment from "./Payment/Payment";
import './PricingModal.css'
function PricingModal({ isOpen, onClose, isMobile }) {
  const [plan, setPlan] = useState({ plan: "basic", price: "2.99$" });
  const [showForm, setShowForm] = useState(false);

  const plans = [
    {
      id: 1,
      name: "Basic",
      essays: 5,
      retries: 2,
      price: "2.99$",
    },
    {
      id: 2,
      name: "Standard",
      essays: 10,
      retries: 4,
      price: "4.99$",
    },
    {
      id: 3,
      name: "Premium",
      essays: 100,
      retries: 6,
      price: "39.99$",
    },
  ];

  const handleCheckout = () => {
    setShowForm(true);
  };
  const [ml, setMl] = useState("0%")
  useEffect(()=>{if (isMobile) {setMl("-10%")}},[isMobile])
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowForm(false);
        setPlan({ plan: "basic", price: "2.99$" });
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pricing</ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          {showForm ? (
            <Payment plan={plan} />
          ) : (
            <Box>
              <Table variant="simple" style={{ maxWidth: "100%" }} marginLeft={ml}>

                <Thead>
                  <Tr>
                  <Th width="5%">Plan</Th>
                  <Th width="5%">Essays</Th>
                  <Th width="5%">Retries per essay</Th>
                  <Th width="5%">Price</Th>
                  </Tr>
                </Thead>
                <Tbody maxWidth="50%" isResponsive>
                  {plans.map(({ id, name, essays, retries, price }) => (
                    <Tr
                      key={id}
                      onClick={() => {
                        setPlan({ plan: name.toLowerCase(), price });
                      }}
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      bg={plan.plan === name.toLowerCase() ? "gray.200" : ""}
                    >
                      <Td width="5%">{name}</Td>
                      <Td width="5%">{essays}</Td>
                      <Td width="5%">{retries}</Td>
                      <Td width="5%">{price}</Td>
                    </Tr>
                  ))}
                  
                </Tbody>
              </Table>
              <Flex justifyContent="center" mt={4}>
                <Button colorScheme="blue" onClick={handleCheckout} margin={"2%"}>
                  Checkout {plan.price}
                </Button>
              </Flex>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PricingModal;
