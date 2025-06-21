import { Test, TestingModule } from '@nestjs/testing';
import { SlopeService } from './slope.service';
import { getModelToken } from '@nestjs/mongoose';
import { Slope } from './slope.schema';
import { Model, Types } from 'mongoose';

const slopeId = new Types.ObjectId();
const domainId = new Types.ObjectId();

const createSlopeDto = {
  name: 'Pârtia Test',
  domainId: domainId,
  coordinates: [1, 2],
  length: 1000,
  difficulty: 'easy',
  width: 30,
  baseElevation: 800,
  topElevation: 1200,
};

const slopeModelMock = {
  _id: slopeId,
  ...createSlopeDto,
  geoLocation: { type: 'Point', coordinates: createSlopeDto.coordinates },
  status: 'Deschis',
};

describe('SlopeService', () => {
  let service: SlopeService;
  let model: Model<Slope>;

  const mockSlopeModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([slopeModelMock]),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(slopeModelMock),
    populate: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlopeService,
        {
          provide: getModelToken(Slope.name),
          useValue: mockSlopeModel,
        },
      ],
    }).compile();

    service = module.get<SlopeService>(SlopeService);
    model = module.get<Model<Slope>>(getModelToken(Slope.name));
  });

  it('should return all slopes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([slopeModelMock]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should find slopes by domainId', async () => {
    const result = await service.findByDomainId(domainId.toString());
    expect(result).toEqual([slopeModelMock]);
    expect(model.find).toHaveBeenCalledWith({ domainId: new Types.ObjectId(domainId.toString()) });
  });
});