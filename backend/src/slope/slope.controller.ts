import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SlopeService } from './slope.service';
import { CreateSlopeDto } from './slope.dto';
import { Slope } from './slope.schema';

@Controller('slopes')
export class SlopeController {
  constructor(private readonly slopeService: SlopeService) {}

  @Post()
  create(@Body() createSlopeDto: CreateSlopeDto): Promise<Slope> {
    return this.slopeService.create(createSlopeDto);
  }

  @Get()
  findAll(): Promise<Slope[]> {
    return this.slopeService.findAll();
  }

 @Get('domain/:domainId')
async findByDomainId(@Param('domainId') domainId: string): Promise<Slope[]> {
  return this.slopeService.findByDomainId(domainId);
}


  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSlopeDto: CreateSlopeDto,
  ): Promise<Slope> {
    return this.slopeService.update(id, updateSlopeDto);
  }
}
