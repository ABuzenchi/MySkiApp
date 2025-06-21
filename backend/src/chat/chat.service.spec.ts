import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { HttpException } from '@nestjs/common';

// ✅ mock global fetch
global.fetch = jest.fn();

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return answer from AI microservice', async () => {
    const mockResponse = { answer: 'Răspuns AI', sources: ['source1.pdf'] };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await service.ask('Ce este MongoDB?');
    expect(result).toEqual(mockResponse);
  });

  it('should throw HttpException on failed fetch', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(service.ask('fail test')).rejects.toThrow(HttpException);
  });

  it('should throw HttpException on fetch error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('network error'));

    await expect(service.ask('network error')).rejects.toThrow(HttpException);
  });
});
