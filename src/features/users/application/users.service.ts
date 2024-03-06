import { UsersInputModel } from '../api/models/input/users.input.model';
import { UsersQueryRepository } from '../infrastructure/users.query.repository';
import { UsersRepository } from '../infrastructure/users.repository';
import { User } from '../domain/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly usersRepository: UsersRepository,
  ) {}
  async create(userData: UsersInputModel) {
    const oldUserName = await this.usersQueryRepository.getByUsername(
      userData.username,
    );
    if (oldUserName) return false;
    const newUser = new User(userData.username);
    const createdUser = await this.usersRepository.create(newUser);
    return createdUser;
  }
}
