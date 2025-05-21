import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    console.log("🔐 Stripe Key from .env:", stripeSecretKey);
    this.stripe = new Stripe(stripeSecretKey);
  }

  async createCheckoutSession(
    productName: string,
    amount: number,
    userId: string,
    username: string,
    domainName: string,
  ): Promise<{ url: string; id: string }> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        userId,
        username,
        domainName,
      },
     success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}'
,
      cancel_url: 'http://localhost:5173/cancel',
    });

    return {
      url: session.url,
      id: session.id,
    };
  }
}
