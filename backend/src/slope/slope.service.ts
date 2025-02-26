import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slope, SlopeDocument } from './slope.schema';
import { CreateSlopeDto } from './slope.dto';

@Injectable()
export class SlopeService {
  constructor(@InjectModel(Slope.name) private slopeModel: Model<SlopeDocument>) {}

  async create(createSlopeDto: CreateSlopeDto): Promise<Slope> {
    const createdSlope = new this.slopeModel(createSlopeDto);
    return createdSlope.save();
  }

  async findAll(): Promise<Slope[]> {
    return this.slopeModel.find().exec();
  }

  async findByLocation(location: string): Promise<Slope[]> {
    return this.slopeModel.find({ location }).exec();
  }

  async update(id: string, updateSlopeDto: CreateSlopeDto): Promise<Slope> {
    return this.slopeModel.findByIdAndUpdate(id, updateSlopeDto, { new: true }).exec();
  }

}
