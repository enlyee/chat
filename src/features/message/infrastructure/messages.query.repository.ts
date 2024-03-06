import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../domain/message.entity';
import { Model } from 'mongoose';
import { ChatViewModelMapper } from '../api/models/output/message.output.model';
import { ChatQueryRepository } from '../../chat/infrastructure/chat.query.repository';

@Injectable()
export class MessagesQueryRepository {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private readonly chatQueryRepository: ChatQueryRepository,
  ) {}

  async getChat(id: string) {
    const chatIsExist = await this.chatQueryRepository.getById(id);
    if (!chatIsExist) return false;
    const chat = await this.messageModel
      .find({ chat: id })
      .sort({ createdAt: 'desc' });
    const newChat = chat.map(ChatViewModelMapper);
    return newChat;
  }
}
