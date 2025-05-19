import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Achievement } from '../achievement/achievement.schema';
import { UserAchievement } from './userachievement.schema';
import { DayTrack } from '../dayTrack/dayTrack.schema';
import { Review } from '../review/review.schema';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class UserAchievementService {
  constructor(
    @InjectModel(Achievement.name)
    private achModel: Model<Achievement>,
    @InjectModel(UserAchievement.name)
    private userAchModel: Model<UserAchievement>,
    @InjectModel(DayTrack.name)
    private dayTrackModel: Model<DayTrack>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
  ) {}

  async checkAndAssignAchievements(userId: string): Promise<string[]> {
    const [achievements, userAch, dayTracks, reviews, user] = await Promise.all(
      [
        this.achModel.find(),
        this.userAchModel.find({ userId }),
        this.dayTrackModel.find({ user: userId }).populate('slopes.slopeId'), // ✨ Important

        this.reviewModel.find({ userId: userId }),
        this.userModel.findById(userId),
      ],
    );

    console.log('🏆 Checking achievements for:', userId);

    const owned = new Set(userAch.map((ua) => ua.achievementTitle));
    const visitedSlopes = new Set<string>();
    const slopeRunMap: Record<string, number> = {};
    let maxDistance = 0;
    let totalRuns = 0;

    for (const track of dayTracks) {
      maxDistance = Math.max(maxDistance, track.totalDistance || 0);

      for (const slope of track.slopes || []) {
        if (!slope?.slopeId || slope.times <= 0) continue;

        const slopeIdStr =
          typeof slope.slopeId === 'string'
            ? slope.slopeId
            : String(slope.slopeId._id || slope.slopeId);

        if (!slopeIdStr) continue;

        visitedSlopes.add(slopeIdStr);
        totalRuns += slope.times;
        slopeRunMap[slopeIdStr] = (slopeRunMap[slopeIdStr] || 0) + slope.times;
      }
    }

    console.log('🔍 maxDistance:', maxDistance);
    console.log('🔍 totalRuns:', totalRuns);
    console.log('🔍 visitedSlopes:', visitedSlopes.size);
    console.log('🔍 reviews:', reviews.length);
    console.log('🔍 friends:', user?.friends?.length);

    const newlyUnlocked: string[] = [];

    for (const ach of achievements) {
      if (owned.has(ach.title)) continue;
      const { type, value } = ach.condition;

      const unlocked =
        (type === 'firstDayTrack' && dayTracks.length >= value) ||
        (type === 'distanceInOneDay' && maxDistance / 1000 >= value) ||
        (type === 'totalRuns' && totalRuns >= value) ||
        (type === 'visitedSlopes' && visitedSlopes.size >= value) ||
        (type === 'singleSlopeRuns' &&
          Object.values(slopeRunMap).some((v) => v >= value)) ||
        (type === 'reviewCount' && reviews.length >= value) ||
        (type === 'friendsCount' && (user?.friends?.length || 0) >= value);

      if (unlocked) {
        console.log('🎉 Unlocked:', ach.title);

        await this.userAchModel.create({
          userId,
          achievementTitle: ach.title,
          achievementId: ach._id.toString(),
          dateUnlocked: new Date(),
        });
        newlyUnlocked.push(ach.title);
      }
    }

    return newlyUnlocked;
  }
}
