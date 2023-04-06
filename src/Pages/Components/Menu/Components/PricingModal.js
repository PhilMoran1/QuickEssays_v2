import {
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
import { useState } from "react";
import Payment from "./Payment/Payment";

function PricingModal({ isOpen, onClose }) {
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
            <>
              <Table variant="simple" minWidth="100%">
                <Thead>
                  <Tr>
                    <Th>Plan</Th>
                    <Th>Essays</Th>
                    <Th>Retries per essay</Th>
                    <Th>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {plans.map(({ id, name, essays, retries, price }) => (
                    <Tr
                      key={id}
                      onClick={() => {
                        setPlan({ plan: name.toLowerCase(), price });
                      }}
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      bg={plan.plan === name.toLowerCase() ? "gray.200" : ""}
                    >
                      <Td>{name}</Td>
                      <Td>{essays}</Td>
                      <Td>{retries}</Td>
                      <Td>{price}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex justifyContent="center" mt={4}>
                <Button colorScheme="blue" onClick={handleCheckout}>
                  Checkout {plan.price}
                </Button>
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PricingModal;
