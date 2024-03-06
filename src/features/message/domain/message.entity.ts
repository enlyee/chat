import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  chat: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  createdAt: Date;

  constructor(chat: string, author: string, text: string) {
    this._id = crypto.randomUUID();
    this.chat = chat;
    this.author = author;
    this.text = text;
    this.createdAt = new Date();
  }
}

export const MessageSchema = SchemaFactory.createForClass(Message);
