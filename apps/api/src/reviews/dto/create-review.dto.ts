import { Transform } from 'class-transformer';
import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  contractId: string;

  @IsString()
  authorId: string;

  @IsString()
  recipientId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => Number(value))
  rating: number;

  @IsString()
  @MinLength(10)
  comment: string;
}
