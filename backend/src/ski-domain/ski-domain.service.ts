import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SkiDomain } from './ski-domain.schema';

@Injectable()
export class SkiDomainService {
  constructor(
    @InjectModel(SkiDomain.name) private skiDomainModel: Model<SkiDomain>,
  ) {}

  async getAll(): Promise<SkiDomain[]> {
    return this.skiDomainModel.find().exec();
  }

  async findByName(name: string): Promise<SkiDomain | null> {
    return this.skiDomainModel.findOne({ name }).exec();
  }

  async findById(id: string): Promise<SkiDomain | null> {
    return this.skiDomainModel.findById(id).exec();
  }
  async getAllWithCoordinates(): Promise<SkiDomain[]> {
  return this.skiDomainModel.find({
    lat: { $exists: true },
    lng: { $exists: true }
  }).exec();
}

}
