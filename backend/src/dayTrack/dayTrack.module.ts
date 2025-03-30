import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DayTrack, DayTrackSchema } from './dayTrack.schema';
import { DayTrackService } from './dayTrack.service';
import { DayTrackController } from './dayTrack.controller';
import { User, UserSchema } from '../auth/schema/user.schema';
import { Slope, SlopeSchema } from '../slope/slope.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DayTrack.name, schema: DayTrackSchema },
      { name: User.name, schema: UserSchema },
      { name: Slope.name, schema: SlopeSchema },
    ]),
  ],
  controllers: [DayTrackController],
  providers: [DayTrackService],
})
export class DayTrackModule {}
