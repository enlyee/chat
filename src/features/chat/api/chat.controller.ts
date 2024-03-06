import {
  Body,
  Controller,
  HttpException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ChatInputModel } from './models/input/chat.input.model';
import { ChatService } from '../application/chat.service';
import { ChatOutputModel } from './models/output/chat.output.model';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { UsersQueryRepository } from '../../users/infrastructure/users.query.repository';
import { ChatQueryRepository } from '../infrastructure/chat.query.repository';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatQueryRepository: ChatQueryRepository,
  ) {}
  @Post('add')
  async create(@Body() chatData: ChatInputModel) {
    const result = await this.chatService.create(chatData);
    if (!result) throw new HttpException('User/users not found', 404);
    return result;
  }

  @Post('get')
  async getUsersChats(@Body() userId: { user: string }) {
    const chats = await this.chatQueryRepository.getUserChats(userId.user);
    if (!chats) throw new NotFoundException('User is not exist');
    return chats;
  }
}
