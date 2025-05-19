// --- 3. friend-request.service.ts ---

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendRequest, FriendRequestDocument } from './friend-request.schema';
import { User, UserDocument } from '../auth/schema/user.schema';
import { UserAchievementService } from 'src/userachievement/userachievement.service';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectModel(FriendRequest.name) private friendRequestModel: Model<FriendRequestDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
     private readonly achievementService: UserAchievementService,
  ) {}

  async sendRequest(senderId: string, receiverId: string) {
    if (senderId === receiverId) {
      throw new BadRequestException('Nu poți trimite cerere către tine.');
    }

    const alreadyFriends = await this.userModel.exists({ _id: senderId, friends: receiverId });
    if (alreadyFriends) {
      throw new BadRequestException('Sunteți deja prieteni.');
    }

    const existing = await this.friendRequestModel.findOne({
      sender: senderId,
      receiver: receiverId,
      status: 'pending',
    });
    if (existing) throw new BadRequestException('Cererea este deja trimisă.');

    return this.friendRequestModel.create({ sender: senderId, receiver: receiverId });
  }

  async getPendingRequestsForUser(userId: string) {
    return this.friendRequestModel.find({ receiver: userId, status: 'pending' }).populate('sender', 'username profilePicture');
  }

  async acceptRequest(requestId: string) {
  const request = await this.friendRequestModel.findById(requestId);
  if (!request) throw new NotFoundException('Cerere inexistentă.');

  request.status = 'accepted';
  await request.save();

  await this.userModel.findByIdAndUpdate(request.sender, {
    $addToSet: { friends: request.receiver },
  });
  await this.userModel.findByIdAndUpdate(request.receiver, {
    $addToSet: { friends: request.sender },
  });

  await this.achievementService.checkAndAssignAchievements(request.sender.toString());
  await this.achievementService.checkAndAssignAchievements(request.receiver.toString());

  return request;
}


  async declineRequest(requestId: string) {
    const request = await this.friendRequestModel.findById(requestId);
    if (!request) throw new NotFoundException('Cerere inexistentă.');

    request.status = 'declined';
    return request.save();
  }
}
