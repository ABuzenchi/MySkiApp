import { Test, TestingModule } from '@nestjs/testing';
import { ForumService } from './forum.service';
import { getModelToken } from '@nestjs/mongoose';

describe('ForumService', () => {
  let service: ForumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForumService,
        {
          provide: getModelToken('ForumMessage'),
          useValue: {
            find: jest.fn().mockReturnValue({
              sort: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue([
                  { username: 'Ana', message: 'Salut!', room: 'general' },
                ]),
              }),
            }),
            create: jest.fn().mockResolvedValue({
              username: 'Ana',
              message: 'Salut!',
              room: 'general',
              createdAt: new Date(),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ForumService>(ForumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return messages for a room', async () => {
    const result = await service.getMessages('general');
    expect(result).toEqual([{ username: 'Ana', message: 'Salut!', room: 'general' }]);
  });

  it('should create a message', async () => {
    const result = await service.saveMessage('general', 'Ana', 'Salut!');
    expect(result).toMatchObject({
      username: 'Ana',
      message: 'Salut!',
      room: 'general',
    });
  });
});
