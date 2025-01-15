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

@WebSocketGateway(3002, {
  cors: {
    origin: 'http://localhost:5173',
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
      const decoded = jwt.verify(token, 'iloveskiing');
      client.data = { user: decoded }; // Initialize client.data object properly
      console.log('User connected:', client.data.user?.username);
    } catch (error) {
      console.error('Authentication error:', error.message);
      client.disconnect();
      return;
    }

    console.log('User after connection', client.data);
    console.log('Client connected:', client.id);

    client.broadcast.emit('user-joined', {
      message: `New user joined the forum: ${client.data.user.username}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected:', client.data?.user?.username);

    this.server.emit('user-left', {
      message: `User left the forum: ${client.data?.user?.username}`,
    });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    if (!client.data?.user) {
      console.error('No user data found for client');
      return;
    }

    console.log(`${client.data.user.username} says: ${message}`);
    this.server.emit('message', {
      username: client.data.user.username,
      message: message,
    });
  }
}