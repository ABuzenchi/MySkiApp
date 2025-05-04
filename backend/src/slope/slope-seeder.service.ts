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
  {
    name: 'Bradul',
    location: 'Poiana Brașov',
    geoLocation: { type: 'Point', coordinates: [45.5894, 25.5476] },
    length: 430,
    difficulty: SlopeDifficulty.EASY,
    width: 71,
    baseElevation: 1035,
    topElevation: 1106,
  },
  {
    name: 'Drumul Roșu',
    location: 'Poiana Brașov',
    geoLocation: { type: 'Point', coordinates: [45.5813, 25.5534] },
    length: 4752,
    difficulty: SlopeDifficulty.EASY,
    width: 22,
    baseElevation: 715,
    topElevation: 1765,
  },
  {
    name: 'Sulinar',
    location: 'Poiana Brașov',
    geoLocation: { type: 'Point', coordinates: [45.5796, 25.5522] },
    length: 2820,
    difficulty: SlopeDifficulty.MEDIUM,
    width: 22,
    baseElevation: 715,
    topElevation: 1765,
  },
  {
    name: 'Lupului',
    location: 'Poiana Brașov',
    geoLocation: { type: 'Point', coordinates: [45.5787, 25.5511] },
    length: 2605,
    difficulty: SlopeDifficulty.MEDIUM,
    width: 22,
    baseElevation: 975,
    topElevation: 1703,
  },
  {
    name: 'Subteleferic',
    location: 'Poiana Brașov',
    geoLocation: { type: 'Point', coordinates: [45.5775, 25.5502] },
    length: 2200,
    difficulty: SlopeDifficulty.DIFFICULT,
    width: 35,
    baseElevation: 975,
    topElevation: 1703,
  },
  {
    name: 'Kanzel',
    location: 'Poiana Brașov',
    geoLocation: { type: 'Point', coordinates: [45.5760, 25.5490] },
    length: 2200,
    difficulty: SlopeDifficulty.DIFFICULT,
    width: 50,
    baseElevation: 1651,
    topElevation: 1760,
  },
  {
    name: 'Stadion',
    location: 'Poiana Brașov',
    geoLocation: { type: 'Point', coordinates: [45.5750, 25.5480] },
    length: 612,
    difficulty: SlopeDifficulty.EASY,
    width: 50,
    baseElevation: 1035,
    topElevation: 1100,
  },

  // Transalpina
  {
    name: 'Pârtia Transalpina',
    location: 'Transalpina',
    geoLocation: { type: 'Point', coordinates: [45.426, 23.798] },
    length: 4000,
    difficulty: SlopeDifficulty.DIFFICULT,
    width: 45,
    baseElevation: 1350,
    topElevation: 2000,
  },
  {
    name: 'Pârtia Transalpina 2',
    location: 'Transalpina',
    geoLocation: { type: 'Point', coordinates: [45.428, 23.802] },
    length: 2000,
    difficulty: SlopeDifficulty.MEDIUM,
    width: 30,
    baseElevation: 1350,
    topElevation: 1700,
  },

  // Straja
  {
    name: 'Pârtia Constantinescu',
    location: 'Straja',
    geoLocation: { type: 'Point', coordinates: [45.2996, 23.2648] },
    length: 1200,
    difficulty: SlopeDifficulty.MEDIUM,
    width: 30,
    baseElevation: 1200,
    topElevation: 1600,
  },
  {
    name: 'Pârtia Platoul Soarelui',
    location: 'Straja',
    geoLocation: { type: 'Point', coordinates: [45.2969, 23.2701] },
    length: 1000,
    difficulty: SlopeDifficulty.EASY,
    width: 25,
    baseElevation: 1250,
    topElevation: 1500,
  },
  {
    name: 'Pârtia Canal',
    location: 'Straja',
    geoLocation: { type: 'Point', coordinates: [45.2981, 23.2673] },
    length: 800,
    difficulty: SlopeDifficulty.DIFFICULT,
    width: 20,
    baseElevation: 1200,
    topElevation: 1450,
  }
];

      



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
