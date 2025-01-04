import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import classes from "./forum.module.css"

const Forum = () => {
  const [messages, setMessages] = useState<string[]>([]);  // State pentru mesaje
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('ws://localhost:3002', {
        auth: {
          token: localStorage.getItem('authToken'),
        },
      });
      console.log("Token", localStorage.getItem('authToken'));
    }

    const socket = socketRef.current;

    // Ascultă de mesajele de tip 'newMessage'
    socket.on('newMessage', (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);  // Adaugă mesajul în lista de mesaje
    });

    // Ascultă de evenimentul 'user-joined'
    socket.on('user-joined', (data: { message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);  // Adaugă mesajul de 'user-joined' în lista de mesaje
    });

    socket.on('user-left', (data: { message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);  // Adaugă mesajul de 'user-joined' în lista de mesaje
    });

    return () => {
      socket.off('newMessage');
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, []);

  // Funcția pentru trimiterea unui mesaj
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = document.querySelector('input') as HTMLInputElement;
    if (input.value) {
      socketRef.current?.emit('newMessage', input.value);  // Trimite mesajul
      input.value = '';  // Resetează câmpul de input
    }
    input.focus();
  };

  return (
    <div className={classes.container}>
      <form className={classes.chatForm} onSubmit={sendMessage}>
        <input className={classes.chatInput} type="text" placeholder="Your message" />
        <button className={classes.sendButton}>Send</button>
      </form>

      {/* Afișează mesajele */}
      <ul className={classes.messageList}>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>  // Afișează fiecare mesaj în listă
        ))}
      </ul>
    </div>
  );
};

export default Forum;
