// ski-domain.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SkiDomain extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  location: string;

  @Prop()
  website: string;
  @Prop()
lat: number;

@Prop()
lng: number;

}

export const SkiDomainSchema = SchemaFactory.createForClass(SkiDomain);
