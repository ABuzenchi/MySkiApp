import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import EmojiWidget from "../../components/emoji-picker/emoji-picker";
import classes from "./forum.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface Message {
  username?: string;
  message: string;
  imageUrl?: string;
  profilePicture?: string;
  timestamp?: string;
}

const Forum = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState("stare-partii");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("ws://localhost:3002", {
        auth: {
          token: localStorage.getItem("authToken"),
        },
      });
    }
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit("joinRoom", room);

    fetch(`http://localhost:3000/forum/${room}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg: any) => ({
          username: msg.username,
          message: msg.message,
          imageUrl: msg.imageUrl,
          profilePicture: msg.profilePicture,
          timestamp: msg.createdAt,
        }));
        setMessages(formatted);
        setTimeout(() => {
          const el = messageListRef.current;
          if (el) el.scrollTop = el.scrollHeight;
        }, 100);
      })
      .catch((err) => console.error("Failed to fetch messages:", err));

    socket.on("message", (data: Message) => {
      setMessages((prev) => {
        const updated = [...prev, data];
        setTimeout(() => {
          const el = messageListRef.current;
          if (el) el.scrollTop = el.scrollHeight;
        }, 100);
        return updated;
      });
    });

    return () => {
      socket.off("message");
    };
  }, [room]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    const trimmed = input?.value.trim();

    if (!trimmed && !imageUrl) return;
    if (isUploadingImage) {
      alert("Așteaptă să se încarce imaginea...");
      return;
    }

    socketRef.current?.emit("newMessage", {
      room,
      message: trimmed,
      imageUrl,
    });

    if (input) input.value = "";
    setImageUrl(null);
    setShowEmojiPicker(false);
  };

  return (
    <div className={classes.pageLayout}>
      <div className={classes.sidebar}>
        <h3>Camere</h3>
        <ul>
          <li
            className={room === "stare-partii" ? classes.active : ""}
            onClick={() => setRoom("stare-partii")}
          >
            Starea pârtiilor
          </li>
          <li
            className={room === "lucruri-pierdute" ? classes.active : ""}
            onClick={() => setRoom("lucruri-pierdute")}
          >
            Lucruri pierdute
          </li>
          <li
            className={room === "echipamente" ? classes.active : ""}
            onClick={() => setRoom("echipamente")}
          >
            Echipament
          </li>
        </ul>
      </div>

      <div className={classes.container}>
        <div className={classes.chatBox}>
          <ul className={classes.messageList} ref={messageListRef}>
            {messages.map((msg, index) => (
              <li key={index} className={classes.messageCard}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <img
                    src={msg.profilePicture}
                    alt="avatar"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      marginRight: 12,
                    }}
                  />
                  <strong>{msg.username}</strong>
                </div>
                <div style={{ whiteSpace: "pre-line" }}>{msg.message}</div>
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="sent"
                    className={classes.messageImage}
                    onClick={() => setSelectedImage(msg.imageUrl!)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {selectedImage && (
                  <div
                    className={classes.modalOverlay}
                    onClick={() => setSelectedImage(null)}
                  >
                    <img
                      src={selectedImage}
                      className={classes.modalImage}
                      alt="preview"
                    />
                  </div>
                )}
                {msg.timestamp && (
                  <div className={classes.timestamp}>
                    {dayjs(msg.timestamp).fromNow()}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <form className={classes.chatForm} onSubmit={sendMessage}>
            <EmojiWidget
              show={showEmojiPicker}
              toggle={() => setShowEmojiPicker((prev) => !prev)}
              onEmojiSelect={(emoji) => {
                const input = inputRef.current;
                if (input) {
                  input.value += emoji;
                  input.focus();
                }
              }}
            />

            <ImageUploader
              onImageSelect={(url) => {
                setImageUrl(url);
                setIsUploadingImage(false);
              }}
              onUploadStart={() => setIsUploadingImage(true)}
            />
            <input
              className={classes.chatInput}
              type="text"
              placeholder="Write your message..."
              ref={inputRef}
            />
            <button className={classes.sendButton} disabled={isUploadingImage}>
              ➤
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forum;
