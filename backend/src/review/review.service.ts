import { Injectable } from '@nestjs/common';
import { Review, ReviewDocument } from './review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAchievementService } from 'src/userachievement/userachievement.service';

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

  async findByResortName(resortName: string) {
    return this.reviewModel.find({ resortName }).sort({ createdAt: -1 }).exec();
  }
}
