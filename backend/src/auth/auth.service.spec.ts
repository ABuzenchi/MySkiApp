import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              _id: 'abc123',
              username: 'testuser',
              password: bcrypt.hashSync('testpass', 10),
              profilePicture: 'pic.jpg',
              favoriteSlopes: [],
              visitedSlopes: [],
            }),
          },
        },
        {
          provide: getModelToken('FriendRequest'),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => 'mock-token',
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should return a JWT token and user info on valid signIn', async () => {
    const result = await service.signIn({
      email: 'test@test.com',
      password: 'testpass',
    });

    expect(result.token).toBe('mock-token');
    expect(result.username).toBe('testuser');
  });

  it('should throw if password is invalid', async () => {
    const moduleUser = {
      findOne: jest.fn().mockResolvedValue({
        password: bcrypt.hashSync('wrongpass', 10),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken('User'), useValue: moduleUser },
        { provide: getModelToken('FriendRequest'), useValue: {} },
        { provide: JwtService, useValue: { sign: () => 'mock-token' } },
      ],
    }).compile();

    const auth = module.get<AuthService>(AuthService);

    await expect(
      auth.signIn({ email: 'email', password: 'testpass' }),
    ).rejects.toThrow();
  });
});
