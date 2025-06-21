import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { StripePaymentService } from './stripe-payment.service';

describe('StripeController', () => {
  let controller: StripeController;
  let stripeService: StripeService;
  let paymentService: StripePaymentService;

  const mockStripeService = {
    createCheckoutSession: jest.fn().mockResolvedValue({
      url: 'http://stripe.test',
      id: 'sess_123',
    }),
  };

  const mockPaymentService = {
    savePayment: jest.fn().mockResolvedValue({}),
    updatePaymentStatus: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController],
      providers: [
        { provide: StripeService, useValue: mockStripeService },
        { provide: StripePaymentService, useValue: mockPaymentService },
      ],
    }).compile();

    controller = module.get<StripeController>(StripeController);
    stripeService = module.get<StripeService>(StripeService);
    paymentService = module.get<StripePaymentService>(StripePaymentService);
  });

  it('should initiate a checkout session and save payment', async () => {
    const req = {
      user: {
        id: 'user123',
        username: 'john',
      },
    };
    const body = {
      name: 'Pachet - Poiana Brașov',
      price: 50,
    };

    const result = await controller.checkout(req, body);
    expect(result).toEqual({ url: 'http://stripe.test' });
    expect(stripeService.createCheckoutSession).toHaveBeenCalled();
    expect(paymentService.savePayment).toHaveBeenCalledWith(expect.objectContaining({
      stripeSessionId: 'sess_123',
      userId: 'user123',
      domainName: 'Poiana Brașov',
      status: 'initiated',
    }));
  });

  it('should confirm payment', async () => {
    const body = { sessionId: 'sess_123' };
    const result = await controller.confirmPayment(body);

    expect(result).toEqual({ message: '✅ Plata a fost confirmată și actualizată.' });
    expect(paymentService.updatePaymentStatus).toHaveBeenCalledWith('sess_123', 'paid');
  });
});
