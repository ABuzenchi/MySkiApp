import { Test, TestingModule } from '@nestjs/testing';
import { DayTrackController } from './dayTrack.controller';
import { DayTrackService } from './dayTrack.service';

describe('DayTrackController', () => {
  let controller: DayTrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayTrackController],
      providers: [
        {
          provide: DayTrackService,
          useValue: {
            createLog: jest.fn().mockResolvedValue({ success: true }),
            getLogsByUsername: jest.fn().mockResolvedValue([]),
            getLogByDate: jest.fn().mockResolvedValue({ date: '2025-01-01' }),
          },
        },
      ],
    }).compile();

    controller = module.get<DayTrackController>(DayTrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new day log', async () => {
    const dto = {
      date: '2025-01-01',
      slopes: [],
    };
    const result = await controller.dayTrack('ana', dto);
    expect(result).toEqual({ success: true });
  });

  it('should return all logs for a user', async () => {
    const result = await controller.getUserLogs('ana');
    expect(result).toEqual([]);
  });

  it('should return log for a specific date', async () => {
    const result = await controller.getLogByDate('ana', '2025-01-01');
    expect(result).toEqual({ date: '2025-01-01' });
  });
});
