import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';

describe('SuggestionsController', () => {
  let controller: SuggestionsController;
  let service: SuggestionsService;

  const mockService = {
    getPredictionFromFastAPI: jest.fn().mockResolvedValue({ prediction: 10 }),
    getSuggestionsFromFastAPI: jest.fn().mockResolvedValue({ suggestions: ['Slope1'] }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestionsController],
      providers: [{ provide: SuggestionsService, useValue: mockService }],
    }).compile();

    controller = module.get<SuggestionsController>(SuggestionsController);
    service = module.get<SuggestionsService>(SuggestionsService);
  });

  it('should return prediction', async () => {
    const body = { dayTracks: [] };
    const result = await controller.predict(body);
    expect(result).toEqual({ prediction: 10 });
    expect(service.getPredictionFromFastAPI).toHaveBeenCalledWith(body);
  });

  it('should return suggestions', async () => {
    const body = { dayTracks: [] };
    const result = await controller.suggest(body);
    expect(result).toEqual({ suggestions: ['Slope1'] });
    expect(service.getSuggestionsFromFastAPI).toHaveBeenCalledWith(body);
  });
});
