import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { FriendRequestDocument } from '../friend-request/friend-request.schema';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
export declare class AuthService {
    private userModel;
    private friendRequestModel;
    private jwtService;
    constructor(userModel: Model<User>, friendRequestModel: Model<FriendRequestDocument>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
        username: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        token: string;
        username: string;
        profilePicture?: string;
        favoriteSlopes?: string[];
        visitedSlopes?: string[];
    }>;
    updateUser(username: string, updateData: Partial<User>): Promise<User>;
    getUserByUsername(username: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateProfilePicture(username: string, profilePicture: string): Promise<{
        username: string;
        profilePicture: string;
    }>;
    loginWithGoogle(token: string): Promise<{
        token: string;
        username: string;
        profilePicture: string;
    }>;
    getAllUsersExceptCurrent(currentUsername: string): Promise<{
        username: string;
        profilePicture?: string;
    }[]>;
    getSuggestedUsers(userId: string): Promise<{
        username: string;
        profilePicture?: string;
    }[]>;
}
