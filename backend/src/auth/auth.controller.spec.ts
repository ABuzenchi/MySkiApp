import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  // Mock simplu pentru AuthService
  const mockAuthService = {
    signUp: jest.fn((dto) => ({
      token: 'test-token',
      username: dto.username
    })),
    signIn: jest.fn(() => ({
      token: 'test-token',
      username: 'test'
    }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  // Test pentru signup
  it('should return token and username on signup', async () => {
    const result = await authController.signUp({
      username: 'test',
      email: 'test@test.com',
      password: 'password'
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('username');
  });

  // Test pentru signin
  it('should return token and username on signin', async () => {
    const result = await authController.signIn({
      email: 'test@test.com',
      password: 'password'
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('username');
  });
});