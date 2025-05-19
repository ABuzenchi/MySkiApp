import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAchievement, UserAchievementSchema } from './userachievement.schema';
import { UserAchievementService } from './userachievement.service';

import { DayTrack } from '../dayTrack/dayTrack.schema';
import { Review } from '../review/review.schema';
import { User } from '../auth/schema/user.schema';
import { Achievement, AchievementSchema } from '../achievement/achievement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAchievement.name, schema: UserAchievementSchema },
      { name: DayTrack.name, schema: require('../dayTrack/dayTrack.schema').DayTrackSchema },
      { name: Review.name, schema: require('../review/review.schema').ReviewSchema },
      { name: User.name, schema: require('../auth/schema/user.schema').UserSchema },
      { name: Achievement.name, schema: AchievementSchema },
    ]),
  ],
  providers: [UserAchievementService],
  exports: [UserAchievementService], // 👈 important pentru dayTrack, friend-request etc.
})
export class UserAchievementModule {}
