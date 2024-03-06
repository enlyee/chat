import { Injectable } from '@nestjs/common';
import { Chat, ChatDocument } from '../domain/chat.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatOutputModelMapper } from '../api/models/output/chat.output.model';

@Injectable()
export class ChatRepository {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}
  async create(chat: Chat) {
    const chatDoc: ChatDocument = await this.chatModel.create(chat);
    return ChatOutputModelMapper(chatDoc);
  }
  async updateDate(id: string) {
    await this.chatModel.updateOne({ _id: id }, { lastActivity: new Date() });
  }
}
