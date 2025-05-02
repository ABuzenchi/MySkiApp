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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO),
    AuthModule,
    ForumModule,
    ScraperModule,
    SlopeModule,
    DayTrackModule,
    FriendRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
