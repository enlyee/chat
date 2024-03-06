import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UsersInputModel } from './models/input/users.input.model';
import { UsersService } from '../application/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('add')
  async create(@Body() userData: UsersInputModel) {
    const userResult = await this.usersService.create(userData);
    if (!userResult) throw new HttpException('This user already exist', 403);
    return userResult;
  }
}
