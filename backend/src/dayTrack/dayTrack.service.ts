import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DayTrack, DayTrackDocument } from './dayTrack.schema';
import { DayTrackDto } from './dayTrack.dto';
import { User } from '../auth/schema/user.schema';
import { Slope } from '../slope/slope.schema';

@Injectable()
export class DayTrackService {
  constructor(
    @InjectModel(DayTrack.name) private dayTrackModel: Model<DayTrackDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Slope.name) private slopeModel: Model<Slope>
  ) {}

  async createLog(username: string, logDto: DayTrackDto) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new NotFoundException('User not found');

    let totalDistance = 0;

    for (const entry of logDto.slopes) {
      const slope = await this.slopeModel.findById(entry.slopeId);
      if (slope) {
        totalDistance += slope.length * entry.times;
      }
    }

    const newLog = await this.dayTrackModel.create({
      user: user._id,
      date: new Date(logDto.date),
      slopes: logDto.slopes,
      totalDistance,
    });

    return newLog;
  }

  async getLogsByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new NotFoundException('User not found');

    return this.dayTrackModel
      .find({ user: user._id })
      .populate('slopes.slopeId')
      .sort({ date: -1 });
  }
}
