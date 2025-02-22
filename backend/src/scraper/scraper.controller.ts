import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { PartieInfo } from './interfaces/partie-info.interface'

@Controller('partii')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async getAllPartii(): Promise<PartieInfo[]> {
    return this.scraperService.getAllPartii();
  }

  @Get('sinaia')
  async getSinaiaPartii(): Promise<PartieInfo[]> {
    return this.scraperService.scrapeSinaia();
  }

  // @Get('poiana-brasov')
  // async getPoianaBrasovPartii(): Promise<PartieInfo[]> {
  //   return this.scraperService.scrapePoianaBrasov();
  // }
}