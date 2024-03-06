import { ArrayMinSize, IsArray, IsString, Length } from 'class-validator';
import { Trim } from '../../../../../common/decorators/transform/trim.decorator';

export class ChatInputModel {
  @IsString()
  @Trim()
  @Length(1, 15)
  name: string;

  @IsArray()
  @ArrayMinSize(2)
  users: string[];
}
