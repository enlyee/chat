import { UserDocument } from '../../../domain/user.entity';

export class UsersOutputModel {
  id: string;
}

export const UsersOutputModelMapper = (
  user: UserDocument,
): UsersOutputModel => {
  const newUser = new UsersOutputModel();
  newUser.id = user._id;
  return newUser;
};
