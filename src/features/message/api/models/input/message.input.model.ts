import { IsString, Length } from 'class-validator';

export class MessageInputModel {
  @IsString()
  chat: string;
  @IsString()
  author: string;
  @IsString()
  @Length(1, 300)
  text: string;
}
