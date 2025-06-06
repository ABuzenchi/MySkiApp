import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { FriendRequest, FriendRequestSchema } from 'src/friend-request/friend-request.schema';

@Module({
    imports:[
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
          inject:[ConfigService],
          useFactory:(config:ConfigService)=>{
            return{
                secret:config.get<string>('JWT_SECRET'),
                signOptions:{
                    expiresIn:config.get<string | number>('JWT_EXPIRE'),
                }
            }
          }
        }),
        MongooseModule.forFeature([
          { name: 'User', schema: UserSchema },
          { name: FriendRequest.name, schema: FriendRequestSchema },
        ])
        
    ],

  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
