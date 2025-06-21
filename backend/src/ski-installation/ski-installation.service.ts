// ski-installation.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SkiInstallation } from './ski-installation.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkiInstallationService {
  constructor(
    @InjectModel(SkiInstallation.name)
    private model: Model<SkiInstallation>,
  ) {}

  async create(data: {
    domainId: string;
    name: string;
    type: string;
    schedule: string;
  }) {
    return this.model.create(data);
  }

  async findByDomain(domainId: string) {
    return this.model.find({ domainId }).exec();
  }
}
