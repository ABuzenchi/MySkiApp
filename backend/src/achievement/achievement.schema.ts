import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AchievementDocument = Achievement & Document;

@Schema()
export class Achievement {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;

  @Prop({
    type: Object,
    required: true,
  })
  condition: {
    type: string;
    value?: number;
  };
}

export const AchievementSchema =
  SchemaFactory.createForClass(Achievement);
