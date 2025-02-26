import { IsString, IsNumber, IsEnum, IsArray } from 'class-validator';
import { SlopeDifficulty } from './slope.schema';  // Asumăm că ai un enum pentru dificultate

export class CreateSlopeDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: number[];

  @IsNumber()
  length: number;

  @IsEnum(SlopeDifficulty)
  difficulty: SlopeDifficulty;

  @IsNumber()
  width: number;

  @IsNumber()
  baseElevation: number;

  @IsNumber()
  topElevation: number;
}
