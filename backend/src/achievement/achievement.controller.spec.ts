import { Test, TestingModule } from '@nestjs/testing';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';

describe('AchievementController', () => {
  let controller: AchievementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchievementController],
      providers: [
        {
          provide: AchievementService,
          useValue: {
            getAllAchievements: jest.fn().mockResolvedValue([
              { title: 'First Ski', condition: 'X km', icon: '🎿' },
            ]),
          },
        },
      ],
    }).compile();

    controller = module.get<AchievementController>(AchievementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all achievements', async () => {
    const result = await controller.getAll();
    expect(result).toEqual([{ title: 'First Ski', condition: 'X km', icon: '🎿' }]);
  });
});
