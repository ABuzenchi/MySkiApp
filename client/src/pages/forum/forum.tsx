import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import classes from "./forum.module.css";
import { Dictionary } from '../../dictionaries/en';

interface Message {
  username?: string;
  message: string;
}

const Forum = () => {
  const [messages, setMessages] = useState<Message[]>([]);
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

  
    socket.on('message', (data: Message) => {
      console.log('Received message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    
    socket.on('user-joined', (data: { message: string }) => {
      console.log('User joined:', data);
      setMessages((prevMessages) => [...prevMessages, { message: data.message }]);
    });

    socket.on('user-left', (data: { message: string }) => {
      console.log('User left:', data);
      setMessages((prevMessages) => [...prevMessages, { message: data.message }]);
    });

    return () => {
      socket.off('message');
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input') as HTMLInputElement;
    if (input.value.trim()) {
      socketRef.current?.emit('newMessage', input.value);
      input.value = '';
    }
    input.focus();
  };

  return (
    <div className={classes.container}>
      <form className={classes.chatForm} onSubmit={sendMessage}>
        <input className={classes.chatInput} type="text" placeholder={Dictionary.YourMessage} />
        <button className={classes.sendButton}>{Dictionary.Send}</button>
      </form>

      <ul className={classes.messageList}>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.username ? `${msg.username}: ${msg.message}` : msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;