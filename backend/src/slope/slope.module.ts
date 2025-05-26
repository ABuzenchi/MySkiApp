import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Slope, SlopeSchema } from './slope.schema';
import { SlopeService } from './slope.service';
import { SlopeController } from './slope.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slope.name, schema: SlopeSchema }]),
  ],
  controllers: [SlopeController],
  providers: [SlopeService],
  exports: [SlopeService,MongooseModule],
})
export class SlopeModule{}