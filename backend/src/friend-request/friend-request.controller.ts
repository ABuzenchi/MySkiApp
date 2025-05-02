// --- 4. friend-request.controller.ts ---

import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';

@Controller('friend-requests')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

  @Post('send')
  sendRequest(@Body() body: { senderId: string; receiverId: string }) {
    return this.friendRequestService.sendRequest(body.senderId, body.receiverId);
  }

  @Get('pending/:userId')
  getPending(@Param('userId') userId: string) {
    return this.friendRequestService.getPendingRequestsForUser(userId);
  }

  @Post('accept/:id')
  accept(@Param('id') requestId: string) {
    return this.friendRequestService.acceptRequest(requestId);
  }

  @Post('decline/:id')
  decline(@Param('id') requestId: string) {
    return this.friendRequestService.declineRequest(requestId);
  }
}