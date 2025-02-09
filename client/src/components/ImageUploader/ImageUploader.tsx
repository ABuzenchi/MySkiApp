import { FileInput } from "@mantine/core";
import { Dictionary } from "../../dictionaries/en";

interface ImageUploaderProps {
  onImageSelect: (image: string | null) => void;
}

const ImageUploader = ({ onImageSelect }: ImageUploaderProps) => {
  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => onImageSelect(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <FileInput
      label={Dictionary.ChooseAPhoto}
      placeholder={Dictionary.ClickPhoto}
      accept="image/*"
      onChange={handleFileChange}
    />
  );
};

export default ImageUploader;
