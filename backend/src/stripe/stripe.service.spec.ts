import { Test, TestingModule } from '@nestjs/testing';
import { StripePaymentService } from './stripe-payment.service';
import { getModelToken } from '@nestjs/mongoose';
import { StripePayment } from './stripe.schema';

describe('StripePaymentService', () => {
  let service: StripePaymentService;

  const mockSave = jest.fn();
  const mockStripeModel = jest.fn(() => ({ save: mockSave }));

  const mockModel = {
    findOneAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    mockSave.mockReset();
    mockModel.findOneAndUpdate.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StripePaymentService,
        {
          provide: getModelToken(StripePayment.name),
          useValue: Object.assign(mockStripeModel, mockModel),
        },
      ],
    }).compile();

    service = module.get<StripePaymentService>(StripePaymentService);
  });

  it('should save a payment', async () => {
    const data = {
      stripeSessionId: 'sess_123',
      userId: 'user123',
      username: 'john',
      domainName: 'Poiana',
      amount: 30,
      currency: 'eur',
      status: 'initiated',
    };

    mockSave.mockResolvedValue(data);

    const result = await service.savePayment(data);
    expect(result).toEqual(data);
    expect(mockStripeModel).toHaveBeenCalledWith(data);
    expect(mockSave).toHaveBeenCalled();
  });

  it('should update payment status', async () => {
    const updated = { status: 'paid' };
    mockModel.findOneAndUpdate.mockResolvedValue(updated);

    const result = await service.updatePaymentStatus('sess_123', 'paid');
    expect(result).toEqual(updated);
    expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
      { stripeSessionId: 'sess_123' },
      { status: 'paid' },
      { new: true },
    );
  });
});
