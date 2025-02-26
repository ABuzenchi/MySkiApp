import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { SlopeInfo } from './interfaces/partie-info.interface';
import { STATION_CONFIG } from './scraper.config';
import { InjectModel } from '@nestjs/mongoose';
import { Slope, SlopeDocument } from 'src/slope/slope.schema';
import { Model } from 'mongoose';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  constructor(
    @InjectModel(Slope.name) private slopeModel: Model<SlopeDocument>
  ) {}
  

  async scrapeStation(stationKey: string): Promise<SlopeInfo[]> {
    console.log('Funcția începe...');
    const config = STATION_CONFIG[stationKey];
    if (!config) throw new Error(`Stațiunea ${stationKey} nu este configurată.`);
  
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
  
    try {
      this.logger.log(`Începe scraping pentru ${stationKey}`);
      await page.goto(config.url, { waitUntil: 'networkidle2', timeout: 60000 });
      console.log(await page.content());
      const slopesInfo = await page.evaluate((selectors) => {
        const slopes = Array.from(document.querySelectorAll(selectors.row));
        return slopes.map(partie => ({
          status: partie.querySelector(selectors.status)?.textContent?.trim() || 'Necunoscut',
          name:partie.querySelector(selectors.name)?.textContent?.trim()||"Necunoscut",
        }));
      }, config.selectors);
  
      this.logger.log(`S-au extras ${slopesInfo.length} pârtii din ${stationKey}`);

      for (const slopeData of slopesInfo) {
        await this.slopeModel.findOneAndUpdate(
          { name: slopeData.name }, 
          { status: slopeData.status }, 
          { new: true }
        );
      }
      return this.slopeModel.find({ location: stationKey }).exec();
    } catch (error) {
      this.logger.error(`Eroare la scraping ${stationKey}: ${error.message}`);
      throw error;
    } finally {
      await browser.close();
    }
  }
}
