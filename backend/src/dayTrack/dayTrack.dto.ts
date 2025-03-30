import { IsArray, IsDateString, IsMongoId, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SlopeEntryDto {
  @IsMongoId()
  slopeId: string;

  @Min(0)
  times: number;
}

export class DayTrackDto {
  @IsDateString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SlopeEntryDto)
  slopes: SlopeEntryDto[];
}
