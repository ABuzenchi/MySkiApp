import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestService } from './friend-request.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserAchievementService } from '../userachievement/userachievement.service';

describe('FriendRequestService', () => {
  let service: FriendRequestService;
  let mockFriendRequestModel: any;
  let mockUserModel: any;
  let mockAchievementService: any;

  beforeEach(async () => {
    mockFriendRequestModel = {
      findOne: jest.fn(),
      findById: jest.fn(),
      find: jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue([]) }),
      create: jest.fn().mockResolvedValue({ sender: '1', receiver: '2', status: 'pending' }),
    };

    mockUserModel = {
      exists: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    mockAchievementService = {
      checkAndAssignAchievements: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendRequestService,
        { provide: getModelToken('FriendRequest'), useValue: mockFriendRequestModel },
        { provide: getModelToken('User'), useValue: mockUserModel },
        { provide: UserAchievementService, useValue: mockAchievementService },
      ],
    }).compile();

    service = module.get<FriendRequestService>(FriendRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a friend request', async () => {
    mockUserModel.exists.mockResolvedValue(false);
    mockFriendRequestModel.findOne.mockResolvedValue(null);
    const result = await service.sendRequest('1', '2');
    expect(result).toMatchObject({ sender: '1', receiver: '2', status: 'pending' });
  });

  it('should throw on self-request', async () => {
    await expect(service.sendRequest('1', '1')).rejects.toThrow(BadRequestException);
  });

  it('should get pending requests for a user', async () => {
    const result = await service.getPendingRequestsForUser('2');
    expect(result).toEqual([]);
  });

  it('should accept a friend request', async () => {
    mockFriendRequestModel.findById.mockResolvedValue({ _id: 'req123', sender: '1', receiver: '2', save: jest.fn(), status: 'pending' });
    const result = await service.acceptRequest('req123');
    expect(result).toHaveProperty('status', 'accepted');
  });

  it('should decline a friend request', async () => {
  const saveMock = jest.fn().mockResolvedValue({ status: 'declined' });

  const mockRequest = {
    status: 'pending',
    save: saveMock,
  };

  mockFriendRequestModel.findById.mockResolvedValue(mockRequest);

  const result = await service.declineRequest('req123');
  expect(saveMock).toHaveBeenCalled();
  expect(result.status).toBe('declined');
});


  it('should throw if request not found on accept', async () => {
    mockFriendRequestModel.findById.mockResolvedValue(null);
    await expect(service.acceptRequest('bad-id')).rejects.toThrow(NotFoundException);
  });
});
