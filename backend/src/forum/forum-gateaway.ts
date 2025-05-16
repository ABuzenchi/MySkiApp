import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { ForumService } from './forum.service';

@WebSocketGateway(3002, {
  cors: {
    origin: 'http://localhost:5173', // frontend-ul tău
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class ForumGateaway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly forumService: ForumService) {}

  // 🟢 Când un client se conectează
  handleConnection(client: Socket) {
    const token = client.handshake.auth.token || client.handshake.query.token;
    console.log('Received token:', token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      client.data = { user: decoded };
      console.log('User connected:', client.data.user?.username);
    } catch (error) {
      console.error('Authentication error:', error.message);
      client.disconnect();
      return;
    }

    console.log('Client connected:', client.id);
    client.broadcast.emit('user-joined', {
      message: `New user joined the forum: ${client.data.user.username}`,
    });
  }

  // 🔴 Când un client se deconectează
  handleDisconnect(client: Socket) {
    console.log('User disconnected:', client.data?.user?.username);
    this.server.emit('user-left', {
      message: `User left the forum: ${client.data?.user?.username}`,
    });
  }

  // 🧩 Clientul alege o cameră (ex: "stare-partii")
  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    if (!client.data?.user) return;
    client.join(room);
    console.log(`${client.data.user.username} joined room: ${room}`);
  }

  // ✉️ Clientul trimite un mesaj în cameră
  @SubscribeMessage('newMessage')
  async handleNewMessage(
    @MessageBody() data: { room: string; message: string; imageUrl?: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.data?.user) {
      console.error('Unauthorized message attempt.');
      return;
    }

    const { room, message, imageUrl } = data;
    const username = client.data.user.username;

    try {
    const profilePicture = client.data.user.profilePicture;

const saved = await this.forumService.saveMessage(
  room,
  username,
  message,
  imageUrl,
  profilePicture, // ✅ adăugat
);

      // Trimitem mesajul tuturor din cameră
      this.server.to(room).emit('message', {
        username,
        message,
        imageUrl,
        profilePicture: client.data.user.profilePicture,
        timestamp: saved.createdAt,
      });
    } catch (err) {
      console.error('Error saving message:', err.message);
    }
    console.log('📥 WS primeste:', data)
  }
}
