import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from '../domain/chat.entity';
import { Model } from 'mongoose';
import { UserChatsModelMapper } from '../api/models/output/chat.output.model';
import { UsersQueryRepository } from '../../users/infrastructure/users.query.repository';

export class ChatQueryRepository {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    private readonly usersQueryRepository: UsersQueryRepository,
  ) {}

  async getById(id: string) {
    const chat = await this.chatModel.findOne({ _id: id });
    if (!chat) return false;
    return chat;
  }

  async getUserChats(userId: string) {
    const user = await this.usersQueryRepository.getById(userId);
    if (!user) return false;
    const chats: ChatDocument[] = await this.chatModel
      .find({ users: { $in: [userId] } })
      .sort({ lastActivity: 'desc' });
    return chats.map(UserChatsModelMapper);
  }
}
