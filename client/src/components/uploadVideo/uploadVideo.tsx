import { useState } from "react";
import {
  Button,
  Group,
  FileInput,
  Title,
  Text,
  Stack,
  Modal,
} from "@mantine/core";

export function UploadVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const handleUpload = async () => {
    if (!videoFile) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await fetch("http://localhost:8002/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResponseData(data);
      setModalOpened(true); // 👈 deschide modalul automat
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Stack>
        <Title order={3}>Upload Ski Video</Title>

        <FileInput
          label="Select your skiing video"
          placeholder="Only .mp4 or .mov files"
          accept="video/mp4,video/quicktime"
          value={videoFile}
          onChange={setVideoFile}
        />

        {videoFile && (
          <video
            width="100%"
            controls
            style={{ borderRadius: "12px", marginTop: "10px" }}
            src={URL.createObjectURL(videoFile)}
          />
        )}

        <Group>
          <Button onClick={handleUpload} disabled={!videoFile || uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Group>

        {responseData && (
          <Text color="green" mt="sm">
            Upload completat. Se procesează video analizat...
          </Text>
        )}
      </Stack>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Videoclip analizat"
        size="lg"
        centered
      >
        {responseData?.processed && (
          <>
            <video
              controls
              width="100%"
              src={`http://localhost:8002/processed/${responseData.processed}`}
              style={{ borderRadius: "10px" }}
            />

            <Button
              mt="md"
              component="a"
              href={`http://localhost:8002/download/${responseData.processed}`}
              download
              fullWidth
              variant="light"
            >
              Descarcă videoclipul analizat
            </Button>
          </>
        )}
      </Modal>
    </>
  );
}
