import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ForumService } from './forum.service';
export declare class ForumGateaway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly forumService;
    server: Server;
    constructor(forumService: ForumService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinRoom(room: string, client: Socket): void;
    handleNewMessage(data: {
        room: string;
        message: string;
        imageUrl?: string;
    }, client: Socket): Promise<void>;
}
