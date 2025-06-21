import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';
import { UserAchievementService } from '../userachievement/userachievement.service';

describe('ReviewService', () => {
  let service: ReviewService;
  let mockReviewModel: any;
  let achievementService: UserAchievementService;

  beforeEach(async () => {
    mockReviewModel = {
      create: jest.fn(),
      find: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };

    const mockAchievementService = {
      checkAndAssignAchievements: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: getModelToken(Review.name), useValue: mockReviewModel },
        { provide: UserAchievementService, useValue: mockAchievementService },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    achievementService = module.get<UserAchievementService>(UserAchievementService);
  });

  it('should create a review and assign achievement if userId exists', async () => {
    const mockData = {
      domainId: 'domain123',
      rating: 5,
      comment: 'Perfect',
      userId: 'user123',
      userName: 'Ana',
      avatarUrl: 'img.png',
    };

    const mockCreatedReview = { ...mockData, _id: 'review123' };
    mockReviewModel.create!.mockResolvedValue(mockCreatedReview);

    const result = await service.create(mockData);

    expect(mockReviewModel.create).toHaveBeenCalledWith(mockData);
    expect(achievementService.checkAndAssignAchievements).toHaveBeenCalledWith('user123');
    expect(result).toEqual(mockCreatedReview);
  });

  it('should find reviews by domainId', async () => {
    const mockReviews = [{ comment: 'Perfect', rating: 5 }];
    (mockReviewModel.exec as jest.Mock).mockResolvedValue(mockReviews);

    const result = await service.findByDomainId('domain123');

    expect(mockReviewModel.find).toHaveBeenCalledWith({ domainId: 'domain123' });
    expect(mockReviewModel.populate).toHaveBeenCalledTimes(2);
    expect(mockReviewModel.sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(result).toEqual(mockReviews);
  });
});
