import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  clientId: string;

  @IsString()
  @MinLength(6)
  title: string;

  @IsString()
  @MinLength(20)
  description: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  budgetMin: number;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  budgetMax: number;

  @IsString()
  category: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  skills: string[];

  @IsDateString()
  deadline: string;
}
