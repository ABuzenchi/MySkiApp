import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ForumModule } from './forum/forum.module';
import { ScraperModule } from './scraper/scraper.module';
import { SlopeModule } from './slope/slope.module';
import { DayTrackModule } from './dayTrack/dayTrack.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { ChatModule } from './chat/chat.module';
import { ReviewModule } from './review/review.module';
import { AchievementModule } from './achievement/achievement.module';
import { UserAchievementModule } from './userachievement/userachievement.module';
import { StripeModule } from './stripe/stripe.module';
import { SkiDomainModule } from './ski-domain/ski-domain.module';
import { SkiInstallationModule } from './ski-installation/ski-installation.module';
console.log('🌐 Using Mongo URI:', process.env.MONGO);

@Module({
  
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO),
    ScheduleModule.forRoot(),
    AuthModule,
    ForumModule,
    ScraperModule,
    SlopeModule,
    DayTrackModule,
    FriendRequestModule,
    SuggestionsModule,
    ChatModule,
    ReviewModule,
    AchievementModule,
    UserAchievementModule,
    StripeModule,
    SkiDomainModule,
    SkiInstallationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
