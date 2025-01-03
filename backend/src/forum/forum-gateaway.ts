import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, { cors: { origin: 'http://localhost:5173' } })
export class ForumGateaway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New user connected...', client.id);

    client.broadcast.emit('user-joined', {
      message: 'New user joined the forum: ${client.id}',
    });
  }

  handleDisconnect(client: Socket) {
    console.log('New user disconnected...', client.id);

    this.server.emit('user-left', {
      message: 'User left the forum: ${client.id}',
    });
  }

  @SubscribeMessage('newMessage')
  handleNewMessage(@MessageBody() message:string) {
    console.log(message);

    this.server.emit('message', 'message');
  }
}