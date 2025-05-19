import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Achievement, AchievementDocument } from './achievement.schema';
import { UserAchievement } from '../userachievement/userachievement.schema';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement.name)
    private achModel: Model<AchievementDocument>,

    @InjectModel(UserAchievement.name)
    private userAchModel: Model<UserAchievement>,

    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getAllAchievements() {
    return this.achModel.find();
  }

  async getAchievementsForUser(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) return [];
    return this.userAchModel.find({ userId: user._id });
  }
}
