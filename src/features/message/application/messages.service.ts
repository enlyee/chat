import { MessageInputModel } from '../api/models/input/message.input.model';
import { ChatQueryRepository } from '../../chat/infrastructure/chat.query.repository';
import { ChatRepository } from '../../chat/infrastructure/chat.repository';
import { MessagesRepository } from '../infrastructure/messages.repository';
import { Message } from '../domain/message.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(
    private readonly chatQueryRepository: ChatQueryRepository,
    private readonly chatRepository: ChatRepository,
    private readonly messagesRepository: MessagesRepository,
  ) {}
  async create(messageData: MessageInputModel) {
    const chat = await this.chatQueryRepository.getById(messageData.chat);
    if (!chat) return 1;
    if (!chat.users.includes(messageData.author)) return 2;
    await this.chatRepository.updateDate(messageData.chat);
    const message = new Message(
      messageData.chat,
      messageData.author,
      messageData.text,
    );
    const messageOutput = await this.messagesRepository.create(message);
    return messageOutput;
  }
}
