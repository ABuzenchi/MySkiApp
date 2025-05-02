// --- 2. friend-request.schema.ts ---

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type FriendRequestDocument = FriendRequest & Document;

@Schema({ timestamps: true })
export class FriendRequest {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  receiver: mongoose.Types.ObjectId;

  @Prop({ enum: ['pending', 'accepted', 'declined'], default: 'pending' })
  status: 'pending' | 'accepted' | 'declined';
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);