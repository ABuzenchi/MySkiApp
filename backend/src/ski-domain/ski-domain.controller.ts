import { Controller, Get, Param } from '@nestjs/common';
import { SkiDomainService } from './ski-domain.service';
import { SkiDomain } from './ski-domain.schema';

@Controller('ski-domains')
export class SkiDomainController {
  constructor(private readonly skiDomainService: SkiDomainService) {}

  @Get()
  getAllDomains(): Promise<SkiDomain[]> {
    return this.skiDomainService.getAll();
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Promise<SkiDomain | null> {
    return this.skiDomainService.findByName(name);
  }
 @Get('map')
getAllWithCoords(): Promise<SkiDomain[]> {
  return this.skiDomainService.getAllWithCoordinates();
}
  @Get(':id')
  findById(@Param('id') id: string): Promise<SkiDomain | null> {
    return this.skiDomainService.findById(id);
  }
 

}
