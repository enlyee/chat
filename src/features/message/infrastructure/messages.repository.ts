import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../domain/message.entity';
import { Model } from 'mongoose';
import { MessageOutputModelMapper } from '../api/models/output/message.output.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}
  async create(message: Message) {
    const newMessage = await this.messageModel.create(message);
    return MessageOutputModelMapper(newMessage);
  }
}
