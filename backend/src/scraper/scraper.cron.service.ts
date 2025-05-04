import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScraperService } from './scraper.service';

@Injectable()
export class CronScraperService {
  constructor(private readonly scraperService: ScraperService) {
    console.log('🚀 CronScraperService INSTANȚIAT!');
  }

  @Cron('0 7 * * 1')
  async handleCron() {
    console.log('🔄 CRON RULEAZĂ: Apel scraper pentru Sinaia...');
    await this.scraperService.scrapeStation('Sinaia');
  }
}
