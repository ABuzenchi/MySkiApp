import { useState } from "react";
import {
  Button,
  FileInput,
  Title,
  Stack,
  Modal,
} from "@mantine/core";
import classes from "./uploadVideo.module.css";

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
      setModalOpened(true);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const containerClass = `${classes.uploadContainer} ${
    videoFile ? classes.topAligned : classes.centered
  }`;

  return (
    <>
      <div className={classes.pageBackground}></div>

      <Stack className={containerClass}>
        <Title order={3} className={classes.uploadTitle}>
          Upload Ski Video
        </Title>

        <FileInput
          label="Select your skiing video"
          placeholder="Only .mp4 or .mov files"
          accept="video/mp4,video/quicktime"
          value={videoFile}
          onChange={setVideoFile}
        />

        <Button
          onClick={handleUpload}
          disabled={!videoFile || uploading}
          className={classes.uploadButton}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>

        {videoFile && (
          <video
            controls
            className={classes.videoPreview}
            src={URL.createObjectURL(videoFile)}
          />
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
              className={classes.videoPreview}
              src={`http://localhost:8002/processed/${responseData.processed}`}
            />
            <Button
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
