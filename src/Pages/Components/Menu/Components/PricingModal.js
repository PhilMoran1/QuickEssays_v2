import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    Button,
    Flex
  } from "@chakra-ui/react";
  import {Fragment, useState} from 'react'

  import Payment from './Payment/Payment'

  function PricingModal({ isOpen, onClose }) {
    // const [price,setPrice] = useState("2.99$")
    const [plan,setPlan] = useState({plan: "basic" , price: "2.99$"})
    const [showForm,setShowForm] = useState(false)
    const handleCheckout = () => {
      
      setShowForm(true)
      console.log(showForm)
    }

    return (
      <Modal isOpen={isOpen} onClose={() => {setShowForm(false); setPlan({plan: "basic" , price: "2.99$"}); onClose();}} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pricing</ModalHeader>
          
          <ModalCloseButton />
          <ModalBody>
          {showForm == true ? 
          <Fragment>
          <Payment plan={plan}></Payment>  
          </Fragment>
          : 
          <Fragment>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab onClick={() => {setPlan({plan: "basic", price: "2.99$"})}}>Basic</Tab>
                <Tab onClick={() => {setPlan({plan: "standard", price: "4.99$"})}}>Standard</Tab>
                <Tab onClick={() => {setPlan({plan: "premium", price: "9.99$"})}}>Premium</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text fontSize="lg">
                    5 Essays
                  </Text>
                  <Text mt={4}>
                    Basic includes 5 essays with 5 retries per essay for the price of 2.99$.

                  </Text>
                </TabPanel>
                <TabPanel>
                  <Text fontSize="lg">
                    10 Essays
                  </Text>
                  <Text mt={4}>
                  Standard includes 10 essays with 10 retries per essay for the price of 4.99$.

                  </Text>
                </TabPanel>
                <TabPanel>
                  <Text fontSize="lg">
                    25 Essays
                  </Text>
                  <Text mt={4}>
                    Premium includes 25 essays with 25 retries per essay for the price of 9.99$.

                  </Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Flex justifyContent="center" mt={4}>
            <Button colorScheme="blue" onClick={handleCheckout}>
              Checkout {plan.price}
            </Button>
          </Flex>
          </Fragment>
          }

          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  
  export default PricingModal;
  