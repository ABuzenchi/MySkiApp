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
let ForumGateaway = class ForumGateaway {
    handleConnection(client) {
        const token = client.handshake.auth.token || client.handshake.query.token;
        console.log('Auth token', client.handshake.auth.token);
        console.log('Query token', client.handshake.query.token);
        console.log('Received token:', token);
        try {
            const decoded = jwt.verify(token, 'iloveskiing');
            client.data = { user: decoded };
            console.log('User connected:', client.data.user?.username);
        }
        catch (error) {
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
    handleDisconnect(client) {
        console.log('User disconnected:', client.data?.user?.username);
        this.server.emit('user-left', {
            message: `User left the forum: ${client.data?.user?.username}`,
        });
    }
    handleNewMessage(message, client) {
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
};
exports.ForumGateaway = ForumGateaway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ForumGateaway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ForumGateaway.prototype, "handleNewMessage", null);
exports.ForumGateaway = ForumGateaway = __decorate([
    (0, websockets_1.WebSocketGateway)(3002, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
        },
    })
], ForumGateaway);
//# sourceMappingURL=forum-gateaway.js.map