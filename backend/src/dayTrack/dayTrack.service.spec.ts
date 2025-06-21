import { Test, TestingModule } from '@nestjs/testing';
import { DayTrackService } from './dayTrack.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserAchievementService } from '../userachievement/userachievement.service';

describe('DayTrackService', () => {
  let service: DayTrackService;

  beforeEach(async () => {
    const mockUserModel = {
      findOne: jest.fn().mockImplementation(({ username }) =>
        username === 'ana' ? { _id: 'user123', username: 'ana' } : null
      ),
    };

    const mockSlopeModel = {
      findById: jest.fn().mockResolvedValue({ length: 2.0 }),
    };

    const mockDayTrackModel = {
      create: jest.fn().mockResolvedValue({
        user: 'user123',
        date: new Date('2025-01-01'),
        slopes: [{ slopeId: 'slope1', times: 2 }],
        totalDistance: 4.0,
      }),
      find: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([]),
      }),
      findOne: jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue({
          date: new Date('2025-01-01'),
          slopes: [],
        }),
      }),
    };

    const mockAchievementService = {
      checkAndAssignAchievements: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DayTrackService,
        { provide: getModelToken('DayTrack'), useValue: mockDayTrackModel },
        { provide: getModelToken('User'), useValue: mockUserModel },
        { provide: getModelToken('Slope'), useValue: mockSlopeModel },
        { provide: UserAchievementService, useValue: mockAchievementService },
      ],
    }).compile();

    service = module.get<DayTrackService>(DayTrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a log with total distance', async () => {
    const dto = {
      date: '2025-01-01',
      slopes: [{ slopeId: 'slope1', times: 2 }],
    };

    const result = await service.createLog('ana', dto);
    expect(result.totalDistance).toBe(4.0);
  });

  it('should return logs for a user', async () => {
    const result = await service.getLogsByUsername('ana');
    expect(result).toEqual([]);
  });

  it('should return log by date', async () => {
    const result = await service.getLogByDate('ana', '2025-01-01');
    expect(result).toHaveProperty('date');
  });
});
