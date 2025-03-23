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
}
