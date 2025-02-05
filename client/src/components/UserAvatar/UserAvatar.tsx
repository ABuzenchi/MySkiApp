import { useState } from 'react';
import { Avatar, FileInput, Stack } from '@mantine/core';

const UserAvatar = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack align="center">
      <Avatar color="pink" src={image} alt="Profile picture" size="lg" />
      <FileInput
        label="Alege o imagine"
        placeholder="Click pentru a selecta"
        accept="image/*"
        onChange={handleFileChange}
      />
    </Stack>
  );
};

export default UserAvatar;
