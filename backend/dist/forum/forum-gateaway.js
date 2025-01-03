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
let ForumGateaway = class ForumGateaway {
    handleConnection(client) {
        console.log('New user connected...', client.id);
        client.broadcast.emit('user-joined', {
            message: 'New user joined the forum: ${client.id}',
        });
    }
    handleDisconnect(client) {
        console.log('New user disconnected...', client.id);
        this.server.emit('user-left', {
            message: 'User left the forum: ${client.id}',
        });
    }
    handleNewMessage(message) {
        console.log(message);
        this.server.emit('message', 'message');
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumGateaway.prototype, "handleNewMessage", null);
exports.ForumGateaway = ForumGateaway = __decorate([
    (0, websockets_1.WebSocketGateway)(3002, { cors: { origin: 'http://localhost:5173' } })
], ForumGateaway);
//# sourceMappingURL=forum-gateaway.js.map