import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
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
    updateUser(username: string, updateData: UpdateUserDto): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
    updateProfilePicture(username: string, profilePicture: string): Promise<{
        username: string;
        profilePicture: string;
    }>;
}
