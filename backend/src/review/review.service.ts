import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument } from './review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAchievementService } from '../userachievement/userachievement.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private readonly achievementService: UserAchievementService,
  ) {}

  async create(data: Partial<Review>) {
    const created = await this.reviewModel.create(data);

    if (data.userId) {
      await this.achievementService.checkAndAssignAchievements(
        data.userId.toString(),
      );
    }

    return created;
  }

  async findByDomainId(domainId: string) {
  return this.reviewModel
    .find({ domainId })
    .populate('userId')
    .populate('domainId')  // dacă vrei numele domeniului în rezultat
    .sort({ createdAt: -1 })
    .exec();
}

}
