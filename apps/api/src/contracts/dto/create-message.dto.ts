import { IsString, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  senderId: string;

  @IsString()
  @MinLength(2)
  content: string;
}
