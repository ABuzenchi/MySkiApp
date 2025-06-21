import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsService } from './suggestions.service';
import { SlopeService } from '../slope/slope.service';

global.fetch = jest.fn(); // mock global fetch

describe('SuggestionsService', () => {
  let service: SuggestionsService;
  let slopeService: SlopeService;

  const mockSlopeService = {
    getAllForAI: jest.fn().mockResolvedValue([{ name: 'Slope1', location: 'X' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuggestionsService,
        { provide: SlopeService, useValue: mockSlopeService },
      ],
    }).compile();

    service = module.get<SuggestionsService>(SuggestionsService);
    slopeService = module.get<SlopeService>(SlopeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call FastAPI /predict', async () => {
    const mockJson = { prediction: 42 };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockJson),
    });

    const result = await service.getPredictionFromFastAPI({ dayTracks: [] });
    expect(result).toEqual(mockJson);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/predict',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('should call FastAPI /suggest', async () => {
    const mockJson = { suggestions: ['Slope1'] };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockJson),
    });

    const result = await service.getSuggestionsFromFastAPI({ dayTracks: [] });
    expect(result).toEqual(mockJson);
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/suggest',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('should throw error if FastAPI fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve('Internal Server Error'),
    });

    await expect(service.getPredictionFromFastAPI({ dayTracks: [] }))
      .rejects.toThrow('FastAPI error: Internal Server Error');
  });
});
