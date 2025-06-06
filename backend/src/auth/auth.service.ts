import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { FriendRequest, FriendRequestDocument } from '../friend-request/friend-request.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(FriendRequest.name)
    private friendRequestModel: Model<FriendRequestDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ token: string; username: string }> {
    const {
      username,
      email,
      password,
      profilePicture,
      favoriteSlopes,
      visitedSlopes,
    } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
        profilePicture,
        favoriteSlopes,
        visitedSlopes,
      });

      const token = this.jwtService.sign({
        id: user._id,
        username: user.username,
      });
      console.log('User created:', user);
      return { token, username: user.username };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async signIn(signInDto: SignInDto): Promise<{
    token: string;
    username: string;
    profilePicture?: string;
    favoriteSlopes?: string[];
    visitedSlopes?: string[];
  }> {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      id: user._id,
      username: user.username,
      profilePicture:user.profilePicture,
    });
    return {
      token,
      username: user.username,
      profilePicture: user.profilePicture,
      favoriteSlopes: user.favoriteSlopes,
      visitedSlopes: user.visitedSlopes,
    };
  }
  async updateUser(username: string, updateData: Partial<User>): Promise<User> {
    console.log(`Updating ${username} with`, updateData);
  
    // 🔐 Hash-uiește parola dacă e prezentă
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
  
    // ⚠️ (Opțional) Verifică dacă username-ul nou este deja luat
    if (updateData.username) {
      const existingUser = await this.userModel.findOne({ username: updateData.username });
      if (existingUser && existingUser.username !== username) {
        throw new Error("Username already taken");
      }
    }
  
    return this.userModel.findOneAndUpdate(
      { username },
      { $set: updateData },
      { new: true },
    );
  }
  

  async getUserByUsername(username: string) {
    return this.userModel
      .findOne({ username })
      .populate('friends', 'username profilePicture');
  }

  async updateProfilePicture(username: string, profilePicture: string) {
    const user = await this.userModel.findOneAndUpdate(
      { username },
      { profilePicture },
      { new: true },
    );
    return { username: user.username, profilePicture: user.profilePicture };
  }

  async loginWithGoogle(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Google token is invalid');
    }

    let user = await this.userModel.findOne({ email: payload.email });

    if (!user) {
      user = await this.userModel.create({
        username: payload.name,
        email: payload.email,
        profilePicture: payload.picture,
        password: await bcrypt.hash('google-auth-placeholder', 10),
      });
    }

    const jwt = this.jwtService.sign({
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
    });

    return {
      token: jwt,
      username: user.username,
      profilePicture: user.profilePicture,
    };
  }
  async getAllUsersExceptCurrent(
    currentUsername: string,
  ): Promise<{ username: string; profilePicture?: string }[]> {
    console.log('Excluding user:', currentUsername);

    const users = await this.userModel
      .find({ username: { $ne: currentUsername } }, 'username profilePicture')
      .exec();

    console.log('Filtered users:', users);

    return users.map((user) => ({
      username: user.username,
      profilePicture: user.profilePicture,
    }));
  }

  async verifyCredentials(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
  
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
  
    return { success: true };
  }
  

  async getSuggestedUsers(
    userId: string,
  ): Promise<{ username: string; profilePicture?: string }[]> {
    const user = await this.userModel.findById(userId).populate('friends');
    const friendsIds = user.friends.map((f) => f._id.toString());

    const pendingRequests = await this.friendRequestModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
      status: 'pending',
    });

    const pendingIds = new Set(
      pendingRequests.flatMap((req) => [
        req.sender.toString(),
        req.receiver.toString(),
      ]),
    );

    const excludeIds = new Set([userId, ...friendsIds, ...pendingIds]);

    const suggestedUsers = await this.userModel
      .find({
        _id: { $nin: Array.from(excludeIds) },
      })
      .select('username profilePicture');
      console.log('Returning suggested users:', suggestedUsers.map(u => u.username));


    return suggestedUsers.map((user) => ({
      username: user.username,
      profilePicture: user.profilePicture,
    }));
  }
}
