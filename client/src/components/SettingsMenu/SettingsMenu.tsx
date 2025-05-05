import {
  Modal,
  Button,
  TextInput,
  PasswordInput,
  Group,
  Text,
} from "@mantine/core";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAvatar, setUsername } from "../../store/authSlice";
import { EnDictionary } from "../../dictionaries/en";

const SettingsMenu = () => {
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.auth);

  // Verificare inițială
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // Câmpuri noi
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");

  const handleImageSelect = async (imageUrl: string | null) => {
    if (!username || !imageUrl) return;
    try {
      const response = await fetch(
        `http://localhost:3000/auth/${username}/avatar`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profilePicture: imageUrl }),
        }
      );

      const data = await response.json();
      dispatch(setAvatar(data.profilePicture));
      localStorage.setItem(`userAvatar_${username}`, data.profilePicture);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const validateAndSubmit = async () => {
    setError("");

    // Validare prealabilă
    if (!currentUsername || !currentPassword) {
      setError("Please enter your current username and password.");
      return;
    }

    // Verificare autentificare existentă
    const authCheck = await fetch("http://localhost:3000/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: currentUsername,
        password: currentPassword,
      }),
    });

    if (!authCheck.ok) {
      setError("Invalid current username or password.");
      return;
    }

    // Validare parolă nouă
    if (newPassword && newPassword.length < 5) {
      setError("New password must be at least 5 characters.");
      return;
    }

    // Construim payload
    const updatePayload: any = {};
    if (newUsername) updatePayload.username = newUsername;
    if (newPassword) updatePayload.password = newPassword;

    if (Object.keys(updatePayload).length === 0) {
      setError("No changes to update.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/auth/update/${currentUsername}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        setError(`Failed to update: ${err}`);
        return;
      }

      const updatedUser = await response.json();
      dispatch(setUsername(updatedUser.username)); // 🟢 sincronizează cu Redux
      localStorage.setItem("username", updatedUser.username); // opțional
      setOpened(false);
    } catch (error) {
      setError("Unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="transparent"
        color="black"
        onClick={() => setOpened(true)}
        size="sm"
      >
        <IoIosSettings />
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={EnDictionary.ProfileSettings}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        withinPortal
        centered
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ImageUploader onImageSelect={handleImageSelect} />

          <Text size="sm">Confirm your identity:</Text>

          <TextInput
            label="Current Username"
            placeholder="Enter your current username"
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.currentTarget.value)}
          />

          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.currentTarget.value)}
          />

          <Text size="sm">Update information:</Text>

          <TextInput
            label="New Username"
            placeholder="Enter new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.currentTarget.value)}
          />

          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
          />

          {error && (
            <Text color="red" size="sm">
              {error}
            </Text>
          )}

          <Group mt="md">
            <Button onClick={validateAndSubmit}>Save Changes</Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default SettingsMenu;
