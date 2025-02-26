import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Slope, SlopeSchema } from 'src/slope/slope.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slope.name, schema: SlopeSchema }]),
  ],
  providers: [ScraperService],
  controllers: [ScraperController],
  exports: [ScraperService],
})
export class ScraperModule {}