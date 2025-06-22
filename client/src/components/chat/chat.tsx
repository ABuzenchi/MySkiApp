import { useState, useRef, useEffect } from "react";

import classes from "./chat.module.css";
import Monty from "../../assets/Monty.png";

function ChatBox() {
  type Message = {
    role: "Monty" | "Me";
    text: string;
  };
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "Monty", text: "Hei, sunt Monty! Cu ce te pot ajuta azi?" },
  ]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { role: "Me", text: question }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "Monty",
          text: data.answer,
        },
      ]);
    } catch (err) {
      console.error("Eroare la trimiterea întrebării:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.chatPageWrapper}>
      <div className={classes.chatContainer}>
        <div className={classes.titleRow}>
          <h2 className={classes.chatTitle}>Monty – Asistentul tău de zăpadă</h2>
          <img src={Monty} alt="Monty" className={classes.montyImage} />
        </div>

        <div className={classes.messagesArea}>
          {messages.length === 0 ? (
            <p className={classes.placeholder}>
              Începe conversația punând o întrebare!
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${classes.messageWrapper} ${
                  msg.role === "Me"
                    ? classes.userWrapper
                    : classes.assistantWrapper
                }`}
              >
                <span className={classes.roleLabel}>
                  {msg.role === "Me" ? "Me" : "Monty"}
                </span>
                <div className={classes.messageBubble}>{msg.text}</div>
              </div>
            ))
          )}
          {loading && (
            <div
              className={`${classes.messageWrapper} ${classes.assistantWrapper}`}
            >
              <span className={classes.roleLabel}>Monty</span>
              <div className={classes.messageBubble}>
                <div className={classes.typingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className={classes.inputBar}>
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askQuestion()}
            placeholder="Pune o întrebare..."
          />
          <button onClick={askQuestion} disabled={loading}>
            {loading ? "Se răspunde..." : "Trimite"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
