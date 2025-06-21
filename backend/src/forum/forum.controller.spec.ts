import { Test, TestingModule } from '@nestjs/testing';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';

describe('ForumController', () => {
  let controller: ForumController;
  let mockService: Partial<ForumService>;

  beforeEach(async () => {
    mockService = {
      getMessages: jest.fn().mockResolvedValue([
        { username: 'Ana', message: 'Salut!', room: 'general' },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumController],
      providers: [
        {
          provide: ForumService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ForumController>(ForumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return messages for a room', async () => {
    const result = await controller.getMessages('general');
    expect(result).toEqual([
      { username: 'Ana', message: 'Salut!', room: 'general' },
    ]);
  });
});
