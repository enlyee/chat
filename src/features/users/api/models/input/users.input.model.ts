import { IsString, Length } from 'class-validator';
import { Trim } from '../../../../../common/decorators/transform/trim.decorator';

export class UsersInputModel {
  @IsString()
  @Trim()
  @Length(1, 15)
  username: string;
}
