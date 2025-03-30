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

  @Get('location/:location')
  async findByLocation(@Param('location') location: string): Promise<Slope[]> {
    const slopes = await this.slopeService.findByLocation(location);
    return slopes;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSlopeDto: CreateSlopeDto,
  ): Promise<Slope> {
    return this.slopeService.update(id, updateSlopeDto);
  }
  @Get('/locations')
  getLocations(): Promise<string[]> {
    return this.slopeService.getAllLocations();
  }
}
