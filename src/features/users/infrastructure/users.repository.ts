import { UsersInputModel } from '../api/models/input/users.input.model';
import { User, UserDocument } from '../domain/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersOutputModelMapper } from '../api/models/output/users.output.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User) {
    const created: UserDocument = await this.userModel.create(user);
    return UsersOutputModelMapper(created);
  }
}
