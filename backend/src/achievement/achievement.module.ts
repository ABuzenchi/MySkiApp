import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Achievement, AchievementSchema } from './achievement.schema';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { UserAchievement, UserAchievementSchema } from 'src/userachievement/userachievement.schema';
import { User, UserSchema } from 'src/auth/schema/user.schema';

@Module({
  imports: [
   MongooseModule.forFeature([
    { name: Achievement.name, schema: AchievementSchema },
  { name: UserAchievement.name, schema: UserAchievementSchema },
   { name: User.name, schema: UserSchema },
])
  ],
  providers: [AchievementService],
  controllers: [AchievementController],
})
export class AchievementModule {}
