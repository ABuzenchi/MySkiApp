import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SkiDomainService } from './ski-domain.service';
import { SkiDomain } from './ski-domain.schema';

describe('SkiDomainService', () => {
  let service: SkiDomainService;
  let mockSkiDomainModel: any;

  beforeEach(async () => {
    mockSkiDomainModel = {
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      findById: jest.fn().mockReturnThis(),
      exec: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkiDomainService,
        {
          provide: getModelToken(SkiDomain.name),
          useValue: mockSkiDomainModel,
        },
      ],
    }).compile();

    service = module.get<SkiDomainService>(SkiDomainService);
  });

  it('should return all ski domains', async () => {
    const mockDomains = [{ name: 'Poiana Brașov' }];
    mockSkiDomainModel.exec.mockResolvedValue(mockDomains);

    const result = await service.getAll();

    expect(mockSkiDomainModel.find).toHaveBeenCalled();
    expect(result).toEqual(mockDomains);
  });

  it('should return the domain matching the given name', async () => {
    const mockDomain = { name: 'Sinaia' };
    mockSkiDomainModel.exec.mockResolvedValue(mockDomain);

    const result = await service.findByName('Sinaia');

    expect(mockSkiDomainModel.findOne).toHaveBeenCalledWith({ name: 'Sinaia' });
    expect(result).toEqual(mockDomain);
  });

  it('should return the domain matching the given ID', async () => {
    const mockDomain = { name: 'Transalpina' };
    mockSkiDomainModel.exec.mockResolvedValue(mockDomain);

    const result = await service.findById('123');

    expect(mockSkiDomainModel.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockDomain);
  });

  it('should return only domains that have both lat and lng', async () => {
    const mockDomains = [{ name: 'Azuga', lat: 45, lng: 25 }];
    mockSkiDomainModel.exec.mockResolvedValue(mockDomains);

    const result = await service.getAllWithCoordinates();

    expect(mockSkiDomainModel.find).toHaveBeenCalledWith({
      lat: { $exists: true },
      lng: { $exists: true },
    });
    expect(result).toEqual(mockDomains);
  });
});
