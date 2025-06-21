import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      signIn: jest.fn().mockResolvedValue({ token: 'mock-token', username: 'testuser' }),
      signUp: jest.fn().mockResolvedValue({ message: 'User created' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return token and username on signIn', async () => {
    const dto = { email: 'test@test.com', password: 'testpass' };
    const result = await controller.signIn(dto);
    expect(result).toEqual({ token: 'mock-token', username: 'testuser' });
  });

  it('should return confirmation on signUp', async () => {
    const dto = { email: 'test@test.com', password: 'testpass', username: 'testuser' };
    const result = await controller.signUp(dto);
    expect(result).toEqual({ message: 'User created' });
  });
});
