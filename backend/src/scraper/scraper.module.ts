import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Slope, SlopeSchema } from 'src/slope/slope.schema';
import { CronScraperService } from './scraper.cron.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slope.name, schema: SlopeSchema }]),
  ],
  providers: [ScraperService, CronScraperService],
  controllers: [ScraperController],
  exports: [ScraperService],
})
export class ScraperModule {}