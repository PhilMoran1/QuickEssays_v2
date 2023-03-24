import { useState } from "react";
import {
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

function SettingsModal({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const nav = useNavigate()
  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }
    // Call API to change password
    // Reset form and close modal
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    onClose();
  };

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
      </ModalContent>
    </Modal>
  );
}

export default SettingsModal;
