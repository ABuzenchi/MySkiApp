import { FileInput } from "@mantine/core";
import { EnDictionary } from "../../dictionaries/en";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string | null) => void;
}

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string;
      const imageUrl = await uploadToCloudinary(base64Image);
      onImageSelect(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const uploadToCloudinary = async (base64Image: string): Promise<string> => {
    const cloudName = "ds7qfjrp8"; // înlocuiește cu al tău din dashboard
    const uploadPreset = "unsigned_profile_upload";

    const formData = new FormData();
    formData.append("file", base64Image);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  return (
    <FileInput
      label={EnDictionary.ChooseAPhoto}
      placeholder={EnDictionary.ClickPhoto}
      accept="image/*"
      onChange={handleFileChange}
    />
  );
};

export default ImageUploader;
