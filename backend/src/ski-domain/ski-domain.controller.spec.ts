import { Test, TestingModule } from '@nestjs/testing';
import { SkiDomainController } from './ski-domain.controller';
import { SkiDomainService } from './ski-domain.service';
import { SkiDomain } from './ski-domain.schema';

describe('SkiDomainController', () => {
  let controller: SkiDomainController;
  let service: SkiDomainService;

  const mockService = {
    getAll: jest.fn(),
    findByName: jest.fn(),
    findById: jest.fn(),
    getAllWithCoordinates: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkiDomainController],
      providers: [
        {
          provide: SkiDomainService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SkiDomainController>(SkiDomainController);
    service = module.get<SkiDomainService>(SkiDomainService);
  });

  it('should return all ski domains', async () => {
    const mockDomains: SkiDomain[] = [{ name: 'Sinaia' } as SkiDomain];
    mockService.getAll.mockResolvedValue(mockDomains);

    const result = await controller.getAllDomains();
    expect(result).toEqual(mockDomains);
    expect(service.getAll).toHaveBeenCalled();
  });

  it('should find a domain by name', async () => {
    const mockDomain: SkiDomain = { name: 'Poiana Brașov' } as SkiDomain;
    mockService.findByName.mockResolvedValue(mockDomain);

    const result = await controller.findByName('Poiana Brașov');
    expect(result).toEqual(mockDomain);
    expect(service.findByName).toHaveBeenCalledWith('Poiana Brașov');
  });

  it('should find a domain by ID', async () => {
    const mockDomain: SkiDomain = { name: 'Straja' } as SkiDomain;
    mockService.findById.mockResolvedValue(mockDomain);

    const result = await controller.findById('123');
    expect(result).toEqual(mockDomain);
    expect(service.findById).toHaveBeenCalledWith('123');
  });

  it('should return domains with coordinates', async () => {
    const mockDomains: SkiDomain[] = [
      { name: 'Transalpina', lat: 45, lng: 24 } as SkiDomain,
    ];
    mockService.getAllWithCoordinates.mockResolvedValue(mockDomains);

    const result = await controller.getAllWithCoords();
    expect(result).toEqual(mockDomains);
    expect(service.getAllWithCoordinates).toHaveBeenCalled();
  });
});
