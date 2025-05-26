import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SlopeDocument = Slope & Document;

export enum SlopeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  DIFFICULT = 'difficult',
}

@Schema({ timestamps: true })
export class Slope {
  @Prop({ required: true, unique: true })
  name: string;

 @Prop({ type: Types.ObjectId, ref: 'SkiDomain', required: true })
domainId: Types.ObjectId;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  geoLocation: {
    type: string;
    coordinates: number[];
  };

  @Prop({ required: true, min: 0 })
  length: number;

  @Prop({
    required: true,
    enum: SlopeDifficulty,
  })
  difficulty: SlopeDifficulty;
  @Prop({ min: 0 })
  width: number;

  @Prop({ required: true, min: 0 })
  baseElevation: number;

  @Prop({ required: true, min: 0 })
  topElevation: number;

  @Prop({ default: 'Necunoscut' })
  status: string;
}

export const SlopeSchema = SchemaFactory.createForClass(Slope);
