import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ForumMessage extends Document {
  @Prop({ required: true })
  room: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  message: string;

  @Prop()
  imageUrl?: string; // opțional

  @Prop()
  profilePicture?: string; // ✅ adăugat

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ForumMessageSchema = SchemaFactory.createForClass(ForumMessage);
