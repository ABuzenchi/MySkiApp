import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestService } from './friend-request.service';

describe('FriendRequestController', () => {
  let controller: FriendRequestController;
  let mockService: Partial<FriendRequestService>;

  beforeEach(async () => {
    mockService = {
      sendRequest: jest.fn().mockResolvedValue({ sender: '1', receiver: '2' }),
      getPendingRequestsForUser: jest.fn().mockResolvedValue([]),
      acceptRequest: jest.fn().mockResolvedValue({ status: 'accepted' }),
      declineRequest: jest.fn().mockResolvedValue({ status: 'declined' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendRequestController],
      providers: [{ provide: FriendRequestService, useValue: mockService }],
    }).compile();

    controller = module.get<FriendRequestController>(FriendRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should send a friend request', async () => {
    const result = await controller.sendRequest({ senderId: '1', receiverId: '2' });
    expect(result).toEqual({ sender: '1', receiver: '2' });
  });

  it('should get pending requests', async () => {
    const result = await controller.getPending('2');
    expect(result).toEqual([]);
  });

  it('should accept a request', async () => {
    const result = await controller.accept('abc123');
    expect(result).toEqual({ status: 'accepted' });
  });

  it('should decline a request', async () => {
    const result = await controller.decline('abc123');
    expect(result).toEqual({ status: 'declined' });
  });
});
