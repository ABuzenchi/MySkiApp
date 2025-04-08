import { Controller, Post, Param, Body, Get, NotFoundException } from '@nestjs/common';
import { DayTrackService } from './dayTrack.service';
import { DayTrackDto } from './dayTrack.dto';

@Controller('day-track')
export class DayTrackController {
  userModel: any;
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
// controller.ts
@Get(':username/:date')
async getLogByDate(
  @Param('username') username: string,
  @Param('date') date: string,
) {
  return this.dayTrackService.getLogByDate(username, date); // ✅ corect
}


}
