import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { StripePaymentService } from './stripe-payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StripePayment, StripePaymentSchema } from './stripe.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StripePayment.name, schema: StripePaymentSchema }]),
    ConfigModule,
  ],
  controllers: [StripeController],
  providers: [StripeService, StripePaymentService],
})
export class StripeModule {}
