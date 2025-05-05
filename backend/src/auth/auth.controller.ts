import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    console.log('Received data:', signUpDto);
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{
    token: string;
    username: string;
    profilePicture?: string;
    favoriteSlopes?: string[];
    visitedSlopes?: string[];
  }> {
    return this.authService.signIn(signInDto);
  }
  @Get('all')
  async getAllUsersExceptCurrent(@Query('exclude') exclude: string) {
    console.log('Exclude username primit:', exclude);
    return this.authService.getAllUsersExceptCurrent(exclude);
  }

  @Get('all-suggested')
async getSuggestedUsers(@Query('userId') userId: string) {
  
  return this.authService.getSuggestedUsers(userId); // ✅ return direct
}

@Post('/verify')
async verifyCredentials(
  @Body('username') username: string,
  @Body('password') password: string,
) {
  return this.authService.verifyCredentials(username, password);
}


  @Patch('/update/:username')
  updateUser(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.authService.updateUser(username, updateUserDto);
  }

  @Get(':username')
  getUser(@Param('username') username: string): Promise<User> {
    return this.authService.getUserByUsername(username);
  }

  @Patch(':username/avatar')
  async updateAvatar(
    @Param('username') username: string,
    @Body('profilePicture') profilePicture: string,
  ) {
    return this.authService.updateProfilePicture(username, profilePicture);
  }

  @Post('google')
  async loginWithGoogle(@Body('token') token: string) {
    return this.authService.loginWithGoogle(token);
  }

  @Patch(':username/slopes')
  updateSlopes(
    @Param('username') username: string,
    @Body() updateData: { favoriteSlopes?: string[]; visitedSlopes?: string[] },
  ): Promise<User> {
    return this.authService.updateUser(username, updateData);
  }
}
