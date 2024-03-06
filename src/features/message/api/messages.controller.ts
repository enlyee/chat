import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { MessageInputModel } from './models/input/message.input.model';
import { MessagesService } from '../application/messages.service';
import { MessagesQueryRepository } from '../infrastructure/messages.query.repository';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly messagesQueryRepository: MessagesQueryRepository,
  ) {}
  @Post('add')
  async create(@Body() messageData: MessageInputModel) {
    const messageId = await this.messagesService.create(messageData);
    if (messageId === 1) throw new NotFoundException('Chat not found');
    if (messageId === 2) throw new NotFoundException('User not in chat');
    return messageId;
  }

  @Post('get')
  async get(@Body() chatId: { chat: string }) {
    const chat = await this.messagesQueryRepository.getChat(chatId.chat);
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }
}
