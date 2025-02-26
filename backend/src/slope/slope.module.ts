// slope.module.ts

import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Slope, SlopeSchema } from './slope.schema';
import { SlopeService } from './slope.service';
import { SlopeController } from './slope.controller';
import { SlopeSeederService } from './slope-seeder.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slope.name, schema: SlopeSchema }]),
  ],
  controllers: [SlopeController],
  providers: [SlopeService, SlopeSeederService],
})
export class SlopeModule implements OnModuleInit {
  constructor(private readonly seederService: SlopeSeederService) {}

  async onModuleInit() {
    await this.seederService.seed();
  }
}
