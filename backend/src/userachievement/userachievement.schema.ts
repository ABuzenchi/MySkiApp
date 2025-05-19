import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserAchievementDocument = UserAchievement & Document;

@Schema({ timestamps: true })
export class UserAchievement {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  achievementTitle: string;

  @Prop({ required: true }) // 👈 ADĂUGAT
  achievementId: string;

  @Prop({ required: true })
  dateUnlocked: Date;
}

export const UserAchievementSchema = SchemaFactory.createForClass(UserAchievement);
UserAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });