import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway(3002, {
  cors: {
    origin: 'http://localhost:5173', // Asigură-te că origin-ul este corect
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class ForumGateaway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    const token = client.handshake.auth.token || client.handshake.query.token;
    console.log('Auth token', client.handshake.auth.token);
    console.log('Query token', client.handshake.query.token);
    console.log('Received token:', token);
    try {
      const decoded = jwt.verify(token, 'iloveskiing'); // Secretul tău
      client.data.user = decoded; // Atașează datele utilizatorului la client
      console.log('User connected:', client.data.user?.username);
    } catch (error) {
      console.error('Authentication error:', error.message);
      client.disconnect(); // Deconectează clienții neautorizați
      return;
    }

    console.log('User after connection', client.data);


    console.log('Client connected:', client.id);

    client.broadcast.emit('user-joined', {
      message: `New user joined the forum: ${client.data.user.username}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected:', client.data.user?.username);

    this.server.emit('user-left', {
      message: `User left the forum: ${client.data.user?.username}`,
    });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@MessageBody() message: string, client: Socket) {
    console.log('Client (before message):', client); // Verifică dacă clientul este definit
    console.log('Client data (before message):', client.data); // Verifică dacă client.data există
    console.log('Client user (before message):', client.data ? client.data.user : 'No user data'); // Verifică datele utilizatorului
    if (client.data.user) {
      console.log(`${client.data.user.username} says: ${message}`);
    }
    console.log(message);
    this.server.emit('message', 'message');
  }
}
