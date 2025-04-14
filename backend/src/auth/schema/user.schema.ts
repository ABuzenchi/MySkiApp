import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";

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
}


export const UserSchema=SchemaFactory.createForClass(User);