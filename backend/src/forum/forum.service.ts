import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ForumMessage } from './forum-message.schema';
import { Model } from 'mongoose';

@Injectable()
export class ForumService {
  constructor(
    @InjectModel(ForumMessage.name)
    private forumMessageModel: Model<ForumMessage>,
  ) {}


   async saveMessage(
  room: string,
  username: string,
  message: string,
  imageUrl?: string,
  profilePicture?: string // ✅ adăugat
) {
  console.log('💾 Saving message in DB:', { room, username, message, imageUrl, profilePicture });
  return this.forumMessageModel.create({
    room,
    username,
    message,
    imageUrl,
    profilePicture, // ✅ adăugat
  });
}

  async getMessages(room: string) {
    return this.forumMessageModel.find({ room }).sort({ createdAt: 1 }).exec();
  }
}
