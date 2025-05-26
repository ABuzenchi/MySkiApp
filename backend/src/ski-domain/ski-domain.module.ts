import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkiDomain, SkiDomainSchema } from './ski-domain.schema';
import { SkiDomainController } from './ski-domain.controller';
import { SkiDomainService } from './ski-domain.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkiDomain.name, schema: SkiDomainSchema },
    ]),
  ],
 controllers: [SkiDomainController],
   providers: [SkiDomainService],
})
export class SkiDomainModule {}
