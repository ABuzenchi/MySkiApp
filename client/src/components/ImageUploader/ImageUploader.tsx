import { FileInput } from "@mantine/core";
import { EnDictionary } from "../../dictionaries/en";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string | null) => void;
  onUploadStart?: () => void;
}

const ImageUploader = ({ onImageSelect, onUploadStart }: ImageUploaderProps) => {
  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    if (onUploadStart) onUploadStart();

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string;
      const imageUrl = await uploadToCloudinary(base64Image);
      console.log("✅ Image URL from Cloudinary:", imageUrl);
      onImageSelect(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const uploadToCloudinary = async (base64Image: string): Promise<string> => {
    const cloudName = "ds7qfjrp8";
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
    <div className={styles.wrapper}>
      <FileInput
        className={styles.input}
        label={EnDictionary.ChooseAPhoto}
        placeholder={EnDictionary.ClickPhoto}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
