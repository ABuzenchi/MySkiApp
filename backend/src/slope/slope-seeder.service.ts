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
      // Sinaia
      {
        name: 'PARTIA NOUA',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.349516, 25.533552] },
        length: 1800,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 30,
        baseElevation: 1026,
        topElevation: 1416,
      },
      {
        name: 'DRUMUL DE VARA',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.362058, 25.494479] },
        length: 2972,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 30,
        baseElevation: 1650,
        topElevation: 2045,
      },
      {
        name: 'FURNICA',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.362058, 25.494479] },
        length: 935,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 10,
        baseElevation: 1883,
        topElevation: 2060,
      },
      {
        name: 'PAPAGAL',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.362058, 25.494479] },
        length: 897,
        difficulty: SlopeDifficulty.DIFFICULT,
        width: 30,
        baseElevation: 1650,
        topElevation: 2045,
      },

      {
        name: 'TÂRLE',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.362058, 25.494479] },
        length: 543,
        difficulty: SlopeDifficulty.DIFFICULT,
        width: 60,
        baseElevation: 1649,
        topElevation: 1870,
      },
      {
        name: 'CARP',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.362058, 25.494479] },
        length: 1382,
        difficulty: SlopeDifficulty.DIFFICULT,
        width: 50,
        baseElevation: 1607,
        topElevation: 2056,
      },
      {
        name: 'VARIANTA',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 2673,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 20,
        baseElevation: 1752,
        topElevation: 2090,
      },
      {
        name: 'VÂLCEL',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.35655975341797, 25.484161376953125],
        },
        length: 978,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 23,
        baseElevation: 1825,
        topElevation: 2017,
      },
      {
        name: 'VALEA DORULUI 1',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 775,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 30,
        baseElevation: 1822,
        topElevation: 2040,
      },
      {
        name: 'VALEA DORULUI 2',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 804,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 30,
        baseElevation: 1819,
        topElevation: 2049,
      },
      {
        name: 'FLOARE DE COLȚ',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.35655975341797, 25.484161376953125],
        },
        length: 1385,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 40,
        baseElevation: 1824,
        topElevation: 2036,
      },
      {
        name: 'PANORAMIC',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 1191,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 28,
        baseElevation: 1821,
        topElevation: 2035,
      },
      {
        name: 'VALEA SOARELUI 1',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 1191,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 60,
        baseElevation: 1821,
        topElevation: 2035,
      },
      {
        name: 'VALEA SOARELUI 2',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 1200,
        difficulty: SlopeDifficulty.EASY,
        width: 50,
        baseElevation: 1760,
        topElevation: 1960,
      },
      {
        name: 'LĂPTICI 1',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 1900,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 40,
        baseElevation: 1760,
        topElevation: 2090,
      },
      {
        name: 'LĂPTICI 2',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 900,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 40,
        baseElevation: 1900,
        topElevation: 2090,
      },
      {
        name: 'COCORA',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 1053,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 20,
        baseElevation: 1831,
        topElevation: 2086,
      },
      {
        name: 'GENUNE',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.364532, 25.473476] },
        length: 1971,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 30,
        baseElevation: 1780,
        topElevation: 2088,
      },
      {
        name: 'CĂLUGĂRUL 1',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.364532, 25.473476] },
        length: 617,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 40,
        baseElevation: 1780,
        topElevation: 1903,
      },
      {
        name: 'CĂLUGĂRUL 2',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.364532, 25.473476] },
        length: 620,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 30,
        baseElevation: 1780,
        topElevation: 1903,
      },
      {
        name: 'CĂLUGĂRUL 3',
        location: 'Sinaia',
        geoLocation: { type: 'Point', coordinates: [45.364532, 25.473476] },
        length: 620,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 30,
        baseElevation: 1780,
        topElevation: 1903,
      },
      {
        name: 'LACULUI',
        location: 'Sinaia',
        geoLocation: {
          type: 'Point',
          coordinates: [45.36370086669922, 25.49251937866211],
        },
        length: 620,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 40,
        baseElevation: 1791,
        topElevation: 1898,
      },

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
        geoLocation: { type: 'Point', coordinates: [45.576, 25.549] },
        length: 2200,
        difficulty: SlopeDifficulty.DIFFICULT,
        width: 50,
        baseElevation: 1651,
        topElevation: 1760,
      },
      {
        name: 'Stadion',
        location: 'Poiana Brașov',
        geoLocation: { type: 'Point', coordinates: [45.575, 25.548] },
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
      },
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
