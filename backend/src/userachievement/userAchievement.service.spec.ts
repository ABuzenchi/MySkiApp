import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserAchievementService } from './userachievement.service';

describe('UserAchievementService', () => {
  let service: UserAchievementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAchievementService,
        { provide: getModelToken('Achievement'), useValue: { find: jest.fn().mockResolvedValue([]) } },
        { provide: getModelToken('UserAchievement'), useValue: { find: jest.fn().mockResolvedValue([]) } },
        { provide: getModelToken('DayTrack'), useValue: { find: jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue([]) }) } },
        { provide: getModelToken('User'), useValue: { findById: jest.fn().mockResolvedValue(null) } },
        { provide: getModelToken('Review'), useValue: { find: jest.fn().mockResolvedValue([]) } },
      ],
    }).compile();

    service = module.get<UserAchievementService>(UserAchievementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty list if there are no achievements to assign', async () => {
    const result = await service.checkAndAssignAchievements('user123');
    expect(result).toEqual([]);
  });
});
