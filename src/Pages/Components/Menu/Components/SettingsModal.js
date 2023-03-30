import { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  Modal,

  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../fetch.mjs";
function SettingsModal({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usrData, setUsrData] = useState('');
  const [response, setResponse] = useState('')
  const [alert, setAlert] = useState(false)

  const nav = useNavigate()
  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  useEffect(() => { // retrieve user data from localstorage
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data)
    if (data) {
      setUsrData(data);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }
    // Call API to change password

    changePassword(usrData,oldPassword, newPassword)
    .then((result) => { 
      console.log(result)
      setResponse(result);
      setAlert(true);
    }).catch((error) => {console.log(error)});
    
    // Reset form and close modal
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    
  };
  useEffect(() =>{setResponse(""); setAlert("");},[onClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            {passwordError && <div>{passwordError}</div>}
            <FormControl isRequired>
              <FormLabel htmlFor="oldPassword">Current Password</FormLabel>
              <Input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <Input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Save</Button>
            <Button ml={2} variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </ModalFooter>
        </form>
        {alert && (
            <Alert status={response.status} mt={4}>
              <AlertIcon />
              {response.message}
            </Alert>
          )}
      </ModalContent>
    </Modal>
  );
}

export default SettingsModal;
