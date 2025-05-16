"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumGateaway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt = require("jsonwebtoken");
const forum_service_1 = require("./forum.service");
let ForumGateaway = class ForumGateaway {
    constructor(forumService) {
        this.forumService = forumService;
    }
    handleConnection(client) {
        const token = client.handshake.auth.token || client.handshake.query.token;
        console.log('Received token:', token);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            client.data = { user: decoded };
            console.log('User connected:', client.data.user?.username);
        }
        catch (error) {
            console.error('Authentication error:', error.message);
            client.disconnect();
            return;
        }
        console.log('Client connected:', client.id);
        client.broadcast.emit('user-joined', {
            message: `New user joined the forum: ${client.data.user.username}`,
        });
    }
    handleDisconnect(client) {
        console.log('User disconnected:', client.data?.user?.username);
        this.server.emit('user-left', {
            message: `User left the forum: ${client.data?.user?.username}`,
        });
    }
    handleJoinRoom(room, client) {
        if (!client.data?.user)
            return;
        client.join(room);
        console.log(`${client.data.user.username} joined room: ${room}`);
    }
    async handleNewMessage(data, client) {
        if (!client.data?.user) {
            console.error('Unauthorized message attempt.');
            return;
        }
        const { room, message, imageUrl } = data;
        const username = client.data.user.username;
        try {
            const profilePicture = client.data.user.profilePicture;
            const saved = await this.forumService.saveMessage(room, username, message, imageUrl, profilePicture);
            this.server.to(room).emit('message', {
                username,
                message,
                imageUrl,
                profilePicture: client.data.user.profilePicture,
                timestamp: saved.createdAt,
            });
        }
        catch (err) {
            console.error('Error saving message:', err.message);
        }
        console.log('📥 WS primeste:', data);
    }
};
exports.ForumGateaway = ForumGateaway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ForumGateaway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ForumGateaway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ForumGateaway.prototype, "handleNewMessage", null);
exports.ForumGateaway = ForumGateaway = __decorate([
    (0, websockets_1.WebSocketGateway)(3002, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
        },
    }),
    __metadata("design:paramtypes", [forum_service_1.ForumService])
], ForumGateaway);
//# sourceMappingURL=forum-gateaway.js.map