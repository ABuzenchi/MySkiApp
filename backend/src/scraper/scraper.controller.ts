import { Controller, Get, Param } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { SlopeInfo } from './interfaces/partie-info.interface';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get(':station')
  async getStationSlopes(@Param('station') station: string): Promise<SlopeInfo[]> {
    return this.scraperService.scrapeStation(station);
  }
  
}
