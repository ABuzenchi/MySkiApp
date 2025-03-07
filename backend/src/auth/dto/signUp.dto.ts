import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({},{message:"Please enter correct email"})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly password: string;
}
