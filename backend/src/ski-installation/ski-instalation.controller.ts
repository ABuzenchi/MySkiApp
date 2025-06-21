// ski-installation.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SkiInstallationService } from './ski-installation.service';

@Controller('installations')
export class SkiInstallationController {
  constructor(private readonly service: SkiInstallationService) {}

  @Post()
  create(@Body() body: {
    domainId: string;
    name: string;
    type: string;
    schedule: string;
  }) {
    return this.service.create(body);
  }

  @Get(':domainId')
  findByDomain(@Param('domainId') domainId: string) {
    return this.service.findByDomain(domainId);
  }
}
