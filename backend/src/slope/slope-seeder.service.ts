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
        location: '654',
        geoLocation: { type: 'Point', coordinates: [45.364532, 25.473476] },
        length: 620,
        difficulty: SlopeDifficulty.MEDIUM,
        width: 30,
        baseElevation: 1780,
        topElevation: 1903,
      },
      {
        name: 'LACULUI',
        location: '474',
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
        name: 'Drumul Roșu',
        location: 'Poiana Brașov',
        geoLocation: { type: 'Point', coordinates: [45.598, 25.405] },
        length: 2000,
        difficulty: SlopeDifficulty.EASY,
        width: 30,
        baseElevation: 1000,
        topElevation: 1300,
      },

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
