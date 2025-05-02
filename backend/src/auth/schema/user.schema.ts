import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type UserDocument = User & Document;
@Schema({
    timestamps:true
})

export class User{
    @Prop({unique:[true,'Duplicate username entered']})
    username:string

    @Prop({unique:[true,'Duplicate email entered']})
    email:string

    @Prop()
    password:string

    @Prop()
    profilePicture:string

    @Prop()
    favoriteSlopes:string[]

    @Prop()
    visitedSlopes:string[]

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [] })
    friends: mongoose.Types.ObjectId[];
}


export const UserSchema=SchemaFactory.createForClass(User);