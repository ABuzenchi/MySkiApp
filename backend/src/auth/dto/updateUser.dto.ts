import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsArray()
  favoriteSlopes?: string[];

  @IsOptional()
  @IsArray()
  visitedSlopes?: string[];
}
