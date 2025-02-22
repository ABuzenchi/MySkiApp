import { Injectable, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PartieInfo } from './interfaces/partie-info.interface';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  async scrapeSinaia(): Promise<PartieInfo[]> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      this.logger.log('Începe scraping pentru Sinaia');
      await page.goto('https://sinaiago.ro/partiile-de-schi/', { 
        waitUntil: 'networkidle2',
        timeout: 60000
      });

      const partiiInfo = await page.evaluate(() => {
        const partii = Array.from(document.querySelectorAll('tr[class*="ninja_table_row"]'));
        
        return partii.map(partie => {
          return {
            nume: partie.querySelector('.ninja_column_2.ninja_clmn_nm_denumire')?.textContent?.trim() || 'Necunoscut',
            dificultate: partie.querySelector('.ninja_column_1.ninja_clmn_nm_stare')?.textContent?.trim() || 'Necunoscut',
            lungime: partie.querySelector('.ninja_column_3.ninja_clmn_nm_lungime')?.textContent?.trim() || 'Necunoscut',
            status: partie.querySelector('.ninja_column_1.ninja_clmn_nm_stare')?.textContent?.trim() || 'Necunoscut',
            diferentaNivel: partie.querySelector('.ninja_column_4.ninja_clmn_nm_altitudine_plecare')?.textContent?.trim() || 'Necunoscut',
            statiune: 'Sinaia',
          };
        });
      });
      
      console.log(`S-au extras ${partiiInfo.length} pârtii din Sinaia`);
      return partiiInfo;
    } catch (error) {
      this.logger.error(`Eroare la scraping Sinaia: ${error.message}`);
      throw error;
    } finally {
      await browser.close();
    }
  }


  async getAllPartii(): Promise<PartieInfo[]> {
    try {
      const [sinaiaPartii] = await Promise.all([
        this.scrapeSinaia(),
      ]);

      return [...sinaiaPartii];
    } catch (error) {
      this.logger.error(`Eroare la extragerea tuturor pârtiilor: ${error.message}`);
      throw error;
    }
  }
}
