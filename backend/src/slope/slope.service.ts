import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Slope, SlopeDocument } from './slope.schema';
import { CreateSlopeDto } from './slope.dto';
import { SkiDomain } from '../ski-domain/ski-domain.schema';
type PopulatedSlope = SlopeDocument & {
  domainId: SkiDomain;
};


@Injectable()
export class SlopeService {
  constructor(
    @InjectModel(Slope.name) private slopeModel: Model<SlopeDocument>,
  ) {}

  async create(createSlopeDto: CreateSlopeDto): Promise<Slope> {
    const createdSlope = new this.slopeModel(createSlopeDto);
    return createdSlope.save();
  }

  async findAll(): Promise<Slope[]> {
    return this.slopeModel.find().exec();
  }

  async findByDomainId(domainId: string): Promise<Slope[]> {
    return this.slopeModel
      .find({ domainId: new Types.ObjectId(domainId) })
      .populate('domainId')
      .exec();
  }

  async update(id: string, updateSlopeDto: CreateSlopeDto): Promise<Slope> {
    return this.slopeModel
      .findByIdAndUpdate(id, updateSlopeDto, { new: true })
      .exec();
  }
  async getAllForAI(): Promise<any[]> {
  const slopes = await this.slopeModel
  .find()
  .populate('domainId')
  .exec() as unknown as PopulatedSlope[];


  return slopes.map(s => ({
    id: s._id.toString(),
    name: s.name,
    location: s.domainId?.name || "Necunoscut",
    length: s.length,
    difficulty: s.difficulty,
  }));
}


}
