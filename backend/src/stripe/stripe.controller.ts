import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripePaymentService } from './stripe-payment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly stripePaymentService: StripePaymentService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('checkout')
  async checkout(
    @Req() req,
    @Body() body: { name: string; price: number }
  ) {
    const user = req.user;
    const domainName = extractDomainName(body.name);

    const session = await this.stripeService.createCheckoutSession(
      body.name,
      body.price,
      user.id,
      user.username,
      domainName
    );

    await this.stripePaymentService.savePayment({
      stripeSessionId: session.id,
      userId: user.id,
      username: user.username,
      domainName,
      amount: body.price,
      currency: 'eur',
      status: 'initiated',
    });

    return { url: session.url };
  }

  // ✅ Nou: confirmare plată pe /success din frontend
  @UseGuards(AuthGuard('jwt'))
  @Post('confirm')
  async confirmPayment(
    @Body() body: { sessionId: string }
  ) {
    await this.stripePaymentService.updatePaymentStatus(body.sessionId, 'paid');
    return { message: '✅ Plata a fost confirmată și actualizată.' };
  }
}

function extractDomainName(name: string): string {
  const parts = name.split(' - ');
  return parts.length > 1 ? parts[1] : name;
}