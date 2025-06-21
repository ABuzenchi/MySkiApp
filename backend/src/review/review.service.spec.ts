import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewService: ReviewService;

  const mockReviewService = {
    create: jest.fn(),
    findByDomainId: jest.fn(),
  };

  const mockReview = {
    domainId: 'dom123',
    rating: 5,
    comment: 'Great slope!',
    userId: 'user123',
    userName: 'testUser',
    avatarUrl: 'url.com/avatar.png',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        { provide: ReviewService, useValue: mockReviewService },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            id: 'user123',
            username: 'testUser',
            profilePicture: 'url.com/avatar.png',
          };
          return true;
        },
      })
      .compile();

    controller = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should add a review', async () => {
    const body = {
      domainId: 'dom123',
      rating: 5,
      comment: 'Great slope!',
    };

    mockReviewService.create.mockResolvedValue(mockReview);

    const result = await controller.addReview({ user: {
      id: 'user123',
      username: 'testUser',
      profilePicture: 'url.com/avatar.png'
    } }, body);

    expect(reviewService.create).toHaveBeenCalledWith({
      ...body,
      userId: 'user123',
      userName: 'testUser',
      avatarUrl: 'url.com/avatar.png',
    });
    expect(result).toEqual(mockReview);
  });

  it('should return reviews by domainId', async () => {
    const reviews = [{ comment: 'Nice!', rating: 4 }];
    mockReviewService.findByDomainId.mockResolvedValue(reviews);

    const result = await controller.getByDomainId('dom123');

    expect(reviewService.findByDomainId).toHaveBeenCalledWith('dom123');
    expect(result).toEqual(reviews);
  });
});
