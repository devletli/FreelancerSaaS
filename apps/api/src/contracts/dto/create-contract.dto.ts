import { IsArray, IsNumber, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContractDto {
  @IsString()
  jobId: string;

  @IsString()
  clientId: string;

  @IsString()
  freelancerId: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  value: number;

  @IsArray()
  @IsString({ each: true })
  milestones: string[];
}
