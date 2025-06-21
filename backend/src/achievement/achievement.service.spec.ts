import { Test, TestingModule } from '@nestjs/testing';
import { AchievementService } from './achievement.service';
import { getModelToken } from '@nestjs/mongoose';

describe('AchievementService', () => {
  let service: AchievementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AchievementService,
        {
          provide: getModelToken('Achievement'),
          useValue: {
            find: jest.fn().mockResolvedValue([
              { title: 'First Ski', condition: 'X km', icon: '🎿' },
            ]),
          },
        },
        {
          provide: getModelToken('UserAchievement'),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AchievementService>(AchievementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all achievements', async () => {
    const achievements = await service.getAllAchievements();
    expect(achievements).toEqual([
      { title: 'First Ski', condition: 'X km', icon: '🎿' },
    ]);
  });
});
