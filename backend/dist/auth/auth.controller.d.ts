import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<{
        token: string;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        token: string;
        username: string;
        profilePicture?: string;
        favoriteSlopes?: string[];
        visitedSlopes?: string[];
    }>;
    getAllUsersExceptCurrent(exclude: string): Promise<{
        username: string;
        profilePicture?: string;
    }[]>;
    getSuggestedUsers(userId: string): Promise<{
        username: string;
        profilePicture?: string;
    }[]>;
    verifyCredentials(username: string, password: string): Promise<{
        success: boolean;
    }>;
    updateUser(username: string, updateUserDto: UpdateUserDto): Promise<User>;
    getUser(username: string): Promise<User>;
    updateAvatar(username: string, profilePicture: string): Promise<{
        username: string;
        profilePicture: string;
    }>;
    loginWithGoogle(token: string): Promise<{
        token: string;
        username: string;
        profilePicture: string;
    }>;
    updateSlopes(username: string, updateData: {
        favoriteSlopes?: string[];
        visitedSlopes?: string[];
    }): Promise<User>;
}
