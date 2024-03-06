import { UserDocument } from '../../../domain/user.entity';

export class UsersOutputModel {
  id: string;
  username: string;
}

export const UsersOutputModelMapper = (
  user: UserDocument,
): UsersOutputModel => {
  const newUser = new UsersOutputModel();
  newUser.id = user._id;
  newUser.username = user.username;
  return newUser;
};
