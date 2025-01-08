import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";

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
}

export const UserSchema=SchemaFactory.createForClass(User);