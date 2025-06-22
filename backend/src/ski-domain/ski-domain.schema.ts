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

@Prop()
imageUrl:string;

@Prop()
webcamUrl: string;

@Prop({
  type: {
    oneDay: String,
    twentyPoints: String,
    tenPoints: String,
  },
})
paymentOptions: {
  oneDay?: string;
  twentyPoints?: string;
  tenPoints?: string;
};


}

export const SkiDomainSchema = SchemaFactory.createForClass(SkiDomain);
