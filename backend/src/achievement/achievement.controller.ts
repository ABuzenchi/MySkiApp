import { Controller, Get, Param } from '@nestjs/common';
import { AchievementService } from './achievement.service';

@Controller('achievements')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Get()
  async getAll() {
    return this.achievementService.getAllAchievements();
  }
  @Get(':username')
  async getByUser(@Param('username') username: string) {
    return this.achievementService.getAchievementsForUser(username);
  }
}
