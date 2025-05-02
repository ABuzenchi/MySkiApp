import mongoose from "mongoose";
export type UserDocument = User & Document;
export declare class User {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    favoriteSlopes: string[];
    visitedSlopes: string[];
    friends: mongoose.Types.ObjectId[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
