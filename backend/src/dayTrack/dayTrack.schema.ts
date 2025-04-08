import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Slope } from 'src/slope/slope.schema';

export type DayTrackDocument = DayTrack & Document;

@Schema({ timestamps: true })
export class DayTrack {
  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop([
    {
      slopeId: { type: Types.ObjectId, ref: Slope.name, required: true },
      times: { type: Number, required: true, min: 0 },
    },
  ])
  slopes: {
    slopeId: Types.ObjectId;
    times: number;
  }[];

  @Prop()
  totalDistance?: number;
}

export const DayTrackSchema = SchemaFactory.createForClass(DayTrack);
