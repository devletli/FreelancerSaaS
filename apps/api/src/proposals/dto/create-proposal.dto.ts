import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateProposalDto {
  @IsString()
  jobId: string;

  @IsString()
  freelancerId: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number(value))
  deliveryDays: number;

  @IsString()
  @MinLength(20)
  coverLetter: string;
}
