import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StripePayment extends Document {
  @Prop()
  stripeSessionId: string;

  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  domainName: string;

  @Prop()
  amount: number;

  @Prop()
  currency: string;

  @Prop()
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const StripePaymentSchema = SchemaFactory.createForClass(StripePayment);
