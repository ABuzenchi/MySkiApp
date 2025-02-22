import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { SlopeInfo } from './interfaces/partie-info.interface'

@Controller('slopes')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async getAllSlopes(): Promise<SlopeInfo[]> {
    return this.scraperService.getAllSlopes();
  }

  @Get('sinaia')
  async getSinaiaPartii(): Promise<SlopeInfo[]> {
    return this.scraperService.scrapeSinaia();
  }

  // @Get('poiana-brasov')
  // async getPoianaBrasovPartii(): Promise<PartieInfo[]> {
  //   return this.scraperService.scrapePoianaBrasov();
  // }
}