"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const friend_request_schema_1 = require("../friend-request/friend-request.schema");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let AuthService = class AuthService {
    constructor(userModel, friendRequestModel, jwtService) {
        this.userModel = userModel;
        this.friendRequestModel = friendRequestModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { username, email, password, profilePicture, favoriteSlopes, visitedSlopes, } = signUpDto;
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
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        const token = this.jwtService.sign({
            id: user._id,
            username: user.username,
        });
        return {
            token,
            username: user.username,
            profilePicture: user.profilePicture,
            favoriteSlopes: user.favoriteSlopes,
            visitedSlopes: user.visitedSlopes,
        };
    }
    async updateUser(username, updateData) {
        console.log(`Updating ${username} with`, updateData);
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        if (updateData.username) {
            const existingUser = await this.userModel.findOne({ username: updateData.username });
            if (existingUser && existingUser.username !== username) {
                throw new Error("Username already taken");
            }
        }
        return this.userModel.findOneAndUpdate({ username }, { $set: updateData }, { new: true });
    }
    async getUserByUsername(username) {
        return this.userModel
            .findOne({ username })
            .populate('friends', 'username profilePicture');
    }
    async updateProfilePicture(username, profilePicture) {
        const user = await this.userModel.findOneAndUpdate({ username }, { profilePicture }, { new: true });
        return { username: user.username, profilePicture: user.profilePicture };
    }
    async loginWithGoogle(token) {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            throw new common_1.UnauthorizedException('Google token is invalid');
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
        });
        return {
            token: jwt,
            username: user.username,
            profilePicture: user.profilePicture,
        };
    }
    async getAllUsersExceptCurrent(currentUsername) {
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
    async verifyCredentials(username, password) {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid username');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return { success: true };
    }
    async getSuggestedUsers(userId) {
        const user = await this.userModel.findById(userId).populate('friends');
        const friendsIds = user.friends.map((f) => f._id.toString());
        const pendingRequests = await this.friendRequestModel.find({
            $or: [{ sender: userId }, { receiver: userId }],
            status: 'pending',
        });
        const pendingIds = new Set(pendingRequests.flatMap((req) => [
            req.sender.toString(),
            req.receiver.toString(),
        ]));
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(friend_request_schema_1.FriendRequest.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map