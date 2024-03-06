import { ChatInputModel } from '../api/models/input/chat.input.model';
import { Injectable } from '@nestjs/common';
import { UsersQueryRepository } from '../../users/infrastructure/users.query.repository';
import { ChatRepository } from '../infrastructure/chat.repository';
import { Chat } from '../domain/chat.entity';
import { UsersService } from '../../users/application/users.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly chatRepository: ChatRepository,
    private readonly usersService: UsersService,
  ) {}
  async create(chatData: ChatInputModel) {
    for (const u of chatData.users) {
      const user = await this.usersQueryRepository.getById(u);
      if (!user) return false;
    }
    const chat = new Chat(chatData.name, chatData.users);
    const newChat = await this.chatRepository.create(chat);
    await this.usersService.addManyToChat(chatData.users, newChat.id);
    return newChat;
  }
}
