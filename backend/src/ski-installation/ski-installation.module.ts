// ski-installation.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkiInstallation, SkiInstallationSchema } from './ski-installation.schema';
import { SkiInstallationService } from './ski-installation.service';
import { SkiInstallationController } from './ski-instalation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkiInstallation.name, schema: SkiInstallationSchema }
    ]),
  ],
  providers: [SkiInstallationService],
  controllers: [SkiInstallationController],
})
export class SkiInstallationModule {}
