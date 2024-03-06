import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../domain/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getByUsername(username: string) {
    const user = await this.userModel.findOne({
      username: username,
    });
    if (!user) return null;
    return user.username;
  }

  async getById(id: string) {
    const user = await this.userModel.findOne({
      _id: id,
    });
    if (!user) return null;
    return user;
  }
}
