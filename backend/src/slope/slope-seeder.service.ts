// slope-seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slope, SlopeDocument, SlopeDifficulty } from './slope.schema';

@Injectable()
export class SlopeSeederService {
  constructor(
    @InjectModel(Slope.name) private slopeModel: Model<SlopeDocument>,
  ) {}

  async seed() {
    const slopes = [
      // Poiana Brașov
      // {
      //   name: 'Bradul',
      //   location: 'Poiana Brașov',
      //   geoLocation: { type: 'Point', coordinates: [45.598, 25.405] },
      //   length: 430,
      //   difficulty: SlopeDifficulty.EASY,
      //   width: 71,
      //   baseElevation: 1035,
      //   topElevation: 1106,
      // },
      // {
      //   name: 'Drumul Roșul',
      //   location: 'Poiana Brașov',
      //   geoLocation: { type: 'Point', coordinates: [45.598, 25.405] },
      //   length: 4752,
      //   difficulty: SlopeDifficulty.EASY,
      //   width: 22,
      //   baseElevation: 715,
      //   topElevation: 1765,
      // },
      // {
      //   name: 'Sulinar',
      //   location: 'Poiana Brașov',
      //   geoLocation: { type: 'Point', coordinates: [45.598, 25.405] },
      //   length: 2820,
      //   difficulty: SlopeDifficulty.MEDIUM,
      //   width: 22,
      //   baseElevation: 715,
      //   topElevation: 1765,
      // },
      // {
      //   name: 'Lupului',
      //   location: 'Poiana Brașov',
      //   geoLocation: { type: 'Point', coordinates: [45.598, 25.405] },
      //   length: 2605,
      //   difficulty: SlopeDifficulty.MEDIUM,
      //   width: 22,
      //   baseElevation: 975,
      //   topElevation: 1703,
      // },
      // {
      //   name: 'Subteleferic',
      //   location: 'Poiana Brașov',
      //   geoLocation: { type: 'Point', coordinates: [45.598, 25.405] },
      //   length: 2200,
      //   difficulty: SlopeDifficulty.DIFFICULT,
      //   width: 35,
      //   baseElevation: 975,
      //   topElevation: 1703,
      // },
      // {
      //   name: 'Kanzel',
      //   location: 'Poiana Brașov',
      //   geoLocation: { type: 'Point', coordinates: [45.598, 25.405] },
      //   length: 2200,
      //   difficulty: SlopeDifficulty.DIFFICULT,
      //   width: 50,
      //   baseElevation: 1651,
      //   topElevation: 1760,
      // },
      // {
      //   name: 'Stadion',
      //   location: 'Poiana Brașov',
      //   geoLocation: { type: 'Point', coordinates: [45.598, 25.405] },
      //   length:612,
      //   difficulty: SlopeDifficulty.EASY,
      //   width: 50,
      //   baseElevation: 1651,
      //   topElevation: 1760,
      // },

      // Transalpina
      {
        name: 'Pârtia Transalpina',
        location: 'Transalpina',
        geoLocation: { type: 'Point', coordinates: [45.426, 23.798] },
        length: 4000,
        difficulty: SlopeDifficulty.DIFFICULT,
        width: 45,
        baseElevation: 1500,
        topElevation: 2200,
      },

      // Straja
      {
        name: 'Pârtia Straja',
        location: 'Straja',
        geoLocation: { type: 'Point', coordinates: [45.421, 23.789] },
        length: 3000,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 35,
        baseElevation: 1300,
        topElevation: 1900,
      },
    ];

    // Inserăm fiecare pantă, dacă nu există deja
    for (const slope of slopes) {
      const existingSlope = await this.slopeModel.findOne({ name: slope.name });
      if (!existingSlope) {
        await this.slopeModel.create(slope);
        console.log(`Pârtia ${slope.name} a fost adăugată cu succes!`);
      } else {
        console.log(`Pârtia ${slope.name} există deja!`);
      }
    }

    console.log('Toate pârtiile au fost inserate.');
  }
}
