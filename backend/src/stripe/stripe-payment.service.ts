
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StripePayment } from './stripe.schema';
import { Model } from 'mongoose';

@Injectable()
export class StripePaymentService {
  constructor(@InjectModel(StripePayment.name) private readonly model: Model<StripePayment>) {}

  async savePayment(data: Partial<StripePayment>) {
    const payment = new this.model(data);
    return payment.save();
  }

  async updatePaymentStatus(sessionId: string, newStatus: string) {
    return this.model.findOneAndUpdate(
      { stripeSessionId: sessionId },
      { status: newStatus },
      { new: true }
    );
  }
}
