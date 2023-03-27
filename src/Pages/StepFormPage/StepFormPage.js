import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
NumberInput,
NumberInputField,
NumberInputStepper,
NumberIncrementStepper,
NumberDecrementStepper,
Text,
Heading,
SimpleGrid,
AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
Stack,
IconButton,
Spacer,
Spinner,
Icon
} from '@chakra-ui/react';
import {AiOutlineCheckCircle} from "react-icons/ai";
import { RiHome2Line } from "react-icons/ri";
import Menu from '../Components/Menu/Menu';
import { createEssay } from "../Components/fetch.mjs";

const styles = [
    "Narrative", 
    "Descriptive",
    "Persuasive", 
    "Expository", 
    "Argumentative", 
    "Comparison/Contrast",
    "Cause/Effect ",
    "Process", 
    "Reflective" 
];

const tones = [
    "Formal",
    "Informal",
    "Academic",
    "Objective",
    "Subjective",
    "Optimistic",
    "Pessimistic",
    "Humorous",
    "Sarcastic"
  ];

  const perspectives = [
    "High school",
    "Undergraduate",
    "Graduate",
    "Academic researcher",
    "Professional in the field"

  ];

  const audiences = [
    "General",
    "Academic",
    "Professional",
    "Expert" ,
    "Niche",
    "Educators and academics in the field",
    "Peers and colleagues in the field",
    "Policymakers and government officials",
    "Industry professionals and practitioners."
  ];

  const types = [
    "Basic", 
    "Standard",
    "Premium"
  ]
const steps = [
  { title: 'Step 1', content: 'set title and about' },
  { title: 'Step 2', content: 'set style' },
  { title: 'Step 3', content: 'set tone' },
  { title: 'Step 4', content: 'perspective'},
  { title: 'Step 5', content: 'audience'},
  { title: 'Step 6', content: 'basic standard or permium'},

  { title: 'Step 7', content: ''},
  { title: 'Step 8', content: ''},

];

const MultiStepForm = () => {
  const nav = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState({title: "Are you sure?", message: "You cannot change these option after this step!"})
  const [loading, setLoading] = useState(true)
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [customStyle, setCustomStyle] = useState("");

  const [selectedTone, setSelectedTone] = useState(null);
  const [customTone, setCustomTone] = useState("");

  const [selectedPerspective, setSelectedPerspective] = useState(null);
  const [customPerspective, setCustomPerspective] = useState("");

  const [selectedAudience, setSelectedAudience] = useState(null);
  const [customAudience, setCustomAudience] = useState("");

  // Style
  const handleStyleSelection = (style) => {
    setFormData((prevFormData) => ({ ...prevFormData, style }));
  };
  const handleCustomStyle = (event) => {
    const a = event.target.value;
    setCustomStyle(a);
    handleStyleSelection(a);
  };

  // Tone
  const handleToneSelection = (tone) => {
    setFormData((prevFormData) => ({ ...prevFormData, tone }));
  };

  const handleCustomTone = (event) => {
    const a = event.target.value;
    setCustomTone(a);
    handleToneSelection(a);
  };

  // Perspective
  const handlePerspectiveSelection = (perspective) => {
    setFormData((prevFormData) => ({ ...prevFormData, perspective }));
};
  const handleCustomPerspective = (event) => {
    const a = event.target.value;
    setCustomPerspective(a);
    handlePerspectiveSelection(a)
  };

  // Audience
  const handleAudienceSelection = (audience) => {
    setFormData((prevFormData) => ({ ...prevFormData, audience }));
  };
  const handleCustomAudience = (event) => {
    const a = event.target.value;
    setCustomAudience(a);
    handleAudienceSelection(a)
  };

  
  // Audience
  const handleTypeSelection = (type) => {
    setFormData((prevFormData) => ({ ...prevFormData, type }));
  };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleLengthChange = (event) => {
        const value = event;
        setFormData((prevFormData) => ({ ...prevFormData, ["length"]: value }));
    }

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const onClose = () => setIsWarningOpen(false);
  const cancelRef = React.useRef();
  const [usrData, setUsrData] = useState('')

  useEffect(() => {
    setUsrData(JSON.parse(localStorage.getItem("data")))
  }, []) 


  const handleContinue = async () => {
    // Handle continue action
    if (alert.title == "Are you sure you want to cancel?") {
        nav("/home")
        return
    } else {
        setIsModalOpen(false)
    }
    
    setIsWarningOpen(false);
    setCurrentStep(currentStep + 1)
    await createEssay(usrData, formData)

    nav("/home")


    
  }

  const handleFormSubmit = () => {
    // Handle form submission here
    setIsWarningOpen(true)
  };

  
  return (
    <>
    <Box p={4}>

{/* Top bar */}
<Stack direction="row" alignItems="center" justifyContent="space-between">
    {/* Left button */}
    
    <IconButton
      aria-label="Menu"
      icon={<RiHome2Line />}
      size="md"
      variant="outline"
      onClick={() => {nav("/home")}}
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

    

    {/* Right button */}
            <Menu></Menu>


  </Stack>
  </Box>
    <AlertDialog
        isOpen={isWarningOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>{alert.title}</AlertDialogHeader>
            <AlertDialogBody>
              {alert.message}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" ml={3} onClick={handleContinue}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    <Modal isOpen={isModalOpen} closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalOverlay />
      <ModalContent boxShadow="lg">
      <ModalHeader display="flex" alignItems="center">
        <Box flex="1">{steps[currentStep].title}</Box>
        <Spacer />
        <Button variant="ghost" onClick={() => {setAlert({title: "Are you sure you want to cancel?", message: "All progress will be lost!"}); setIsWarningOpen(true)}}>
            Cancel
        </Button>
        </ModalHeader>

        <ModalBody>
          <Box textAlign="center" mb={4}>
            {/* <p>{steps[currentStep].content}</p> */}
          </Box>

          <form onSubmit={handleFormSubmit}>
            {currentStep === 0 && (
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  required
                />
           
                <FormLabel>About</FormLabel>
                <Textarea
                  name="about"
                  value={formData.about || ''}
                  onChange={handleInputChange}
                  required
                />
                <FormLabel>Length</FormLabel>
                <NumberInput name="length" value={formData.length || ''} onChange={handleLengthChange} defaultValue={150} min={150} max={2000} required>
                    <NumberInputField />
                    <NumberInputStepper >
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
              </FormControl>
            )}

            {currentStep === 1 && (
              <FormControl mb={4}>
                <FormLabel>Style</FormLabel>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {styles.map((style) => (
                    <Box
                      key={style}
                      border="1px solid"
                      borderColor={
                        formData.style === style ? 'blue.500' : 'gray.200'
                      }
                      borderRadius="md"
                      cursor="pointer"
                      p={2}
                      onClick={() => handleStyleSelection(style)}
                    >
                      {style}
                    </Box>
                  ))}
                  
                </Grid>
                <Box mt={4}>
                    <FormLabel>Or enter custom style:</FormLabel>
                    <Input
                        value={customStyle}
                        onChange={handleCustomStyle}
                        placeholder="Enter custom style"
                    />
                    </Box>
              </FormControl>
            )}

            {currentStep === 2 && (
              <FormControl mb={4}>
                <FormLabel>Tone</FormLabel>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {tones.map((tone) => (
                    <Box
                      key={tone}
                      border="1px solid"
                      borderColor={
                        formData.tone === tone ? 'blue.500' : 'gray.200'
                      }
                      borderRadius="md"
                      cursor="pointer"
                      p={2}
                      onClick={() => handleToneSelection(tone)}
                    >
                      {tone}
                    </Box>
                  ))}
                  
                </Grid>
                <Box mt={4}>
                    <FormLabel>Or enter custom tone:</FormLabel>
                    <Input
                        value={customTone}
                        onChange={handleCustomTone}
                        placeholder="Enter custom tone"
                    />
                    </Box>
              </FormControl>
            )}  
            {currentStep === 3 && (
              <FormControl mb={4}>
                <FormLabel>Perspective</FormLabel>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {perspectives.map((perspective) => (
                    <Box
                      key={perspective}
                      border="1px solid"
                      borderColor={
                        formData.perspective === perspective ? 'blue.500' : 'gray.200'
                      }
                      borderRadius="md"
                      cursor="pointer"
                      p={2}
                      onClick={() => handlePerspectiveSelection(perspective)}
                    >
                      {perspective}
                    </Box>
                  ))}
                  
                </Grid>
                <Box mt={4}>
                    <FormLabel>Or enter custom perspective:</FormLabel>
                    <Input
                        value={customPerspective}
                        onChange={handleCustomPerspective}
                        placeholder="Enter custom perspective"
                    />
                    </Box>
              </FormControl>
            )}
            {currentStep === 4 && (
              <FormControl mb={4}>
                <FormLabel>Audience</FormLabel>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {audiences.map((audience) => (
                    <Box
                      key={audience}
                      border="1px solid"
                      borderColor={
                        formData.audience === audience ? 'blue.500' : 'gray.200'
                      }
                      borderRadius="md"
                      cursor="pointer"
                      p={2}
                      onClick={() => handleAudienceSelection(audience)}
                    >
                      {audience}
                    </Box>
                  ))}
                  
                </Grid>
                <Box mt={4}>
                    <FormLabel>Or enter custom audience:</FormLabel>
                    <Input
                        value={customAudience}
                        onChange={handleCustomAudience}
                        placeholder="Enter custom audience"
                    />
                    </Box>
              </FormControl>
            )}
            {currentStep === 5 && (
              <FormControl mb={4}>
                <FormLabel>Type</FormLabel>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {types.map((type) => (
                    <Box
                      key={type}
                      border="1px solid"
                      borderColor={
                        formData.type === type ? 'blue.500' : 'gray.200'
                      }
                      borderRadius="md"
                      cursor="pointer"
                      p={2}
                      onClick={() => handleTypeSelection(type)}
                    >
                      {type}
                    </Box>
                  ))}
                  
                </Grid>
                
              </FormControl>
            )}
           {currentStep === 6 && (
    <Box mt={8}   textAlign="center" alignItems="center" justifyContent="center">
        <Heading mb={4}>
          Summary
        </Heading>
       
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
        <FormControl>
        <FormLabel>Type</FormLabel>

        {formData.type === 'Basic' && (
            <Box bg="gray.200" p={1} borderRadius="md" mt={2}  >
              <Text fontSize="sm" color="gray.500">{formData.type}</Text>
            </Box>
          )}
          {formData.type === 'Standard' && (
            <Box bg="gray.700" p={1} borderRadius="md" mt={2} >
              <Text fontSize="sm" color="white">{formData.type}</Text>
            </Box>
          )}
          {formData.type === 'Premium' && (
            <Box bg="purple.500" p={1} borderRadius="md" mt={2} >
              <Text fontSize="sm" color="white">{formData.type}</Text>
            </Box>
          )}
          </FormControl>

          
        </SimpleGrid>
        <FormLabel>About</FormLabel>
        <Text>{formData.about}</Text>

    <Button mt={9} colorScheme="blue" width="100%" onClick={() => { setAlert({title: "Are you sure?", message: "You cannot change these option after this step!"}); handleFormSubmit();}}>Confirm</Button>
  </Box>
)}
           {currentStep === 7 && (
                 <Box mt={8} textAlign="center" alignItems="center" justifyContent="center">
                 {loading ? (
                   <Spinner size="xl" />
                 ) : (
                   <>
                     <Icon as={AiOutlineCheckCircle} w={12} h={12} color="green.500" mb={4} />
                     <Text mb={4}>Task complete!</Text>
                   </>
                 )}
               </Box>
           )}

          </form>
        </ModalBody>
        <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
  {currentStep !== 0 && (
    <Button
      type="button"
      variant="ghost"
      onClick={handlePreviousStep}
      mr={2}
    >
      Previous
    </Button>
  )}

  {currentStep === steps.length - 2 ? (
    null            
  ) : (
    <>
      {/* <Button colorScheme="gray" onClick={() => {nav("/home")} } ml={0}>
        Home
      </Button> */}
      <Button colorScheme="blue" onClick={handleNextStep} ml={0}>
        Next
      </Button>
    </>
  )}
</ModalFooter>


      </ModalContent>
    </Modal>
    </>
  );
};
export default MultiStepForm;




