import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { DayTrackService } from './dayTrack.service';
import { DayTrackDto } from './dayTrack.dto';

@Controller('day-track')
export class DayTrackController {
  constructor(private readonly dayTrackService: DayTrackService) {}

  @Post(':username')
  async dayTrack(
    @Param('username') username: string,
    @Body() dayTrackData: DayTrackDto,
  ) {
    return this.dayTrackService.createLog(username, dayTrackData);
  }

  @Get(':username')
  async getUserLogs(@Param('username') username: string) {
    return this.dayTrackService.getLogsByUsername(username);
  }
}
