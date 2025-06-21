import { Test, TestingModule } from '@nestjs/testing';
import { SlopeController } from './slope.controller';
import { SlopeService } from './slope.service';
import { Types } from 'mongoose';
import { SlopeDifficulty } from './slope.schema';

const domainId = new Types.ObjectId().toString();
const slopeId = new Types.ObjectId();

const createSlopeDto = {
  name: 'Test Slope',
  domainId: domainId,
  coordinates: [0, 0],
  length: 100,
    difficulty: SlopeDifficulty.EASY,
  width: 20,
  baseElevation: 900,
  topElevation: 1200,
};

const slopeResponse = {
  _id: slopeId,
  ...createSlopeDto,
  geoLocation: { type: 'Point', coordinates: [0, 0] },
  status: 'Deschis',
};

describe('SlopeController', () => {
  let controller: SlopeController;
  let service: SlopeService;

  const mockService = {
    create: jest.fn().mockResolvedValue(slopeResponse),
    findAll: jest.fn().mockResolvedValue([slopeResponse]),
    findByDomainId: jest.fn().mockResolvedValue([slopeResponse]),
    update: jest.fn().mockResolvedValue(slopeResponse),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlopeController],
      providers: [{ provide: SlopeService, useValue: mockService }],
    }).compile();

    controller = module.get<SlopeController>(SlopeController);
    service = module.get<SlopeService>(SlopeService);
  });

  it('should create a slope', async () => {
    const result = await controller.create(createSlopeDto);
    expect(result).toEqual(slopeResponse);
    expect(service.create).toHaveBeenCalledWith(createSlopeDto);
  });

  it('should return all slopes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([slopeResponse]);
  });

  it('should return slopes by domainId', async () => {
    const result = await controller.findByDomainId(domainId.toString());
    expect(result).toEqual([slopeResponse]);
  });

  it('should update a slope', async () => {
    const result = await controller.update(slopeId.toString(), createSlopeDto);
    expect(result).toEqual(slopeResponse);
    expect(service.update).toHaveBeenCalledWith(slopeId.toString(), createSlopeDto);
  });
});
