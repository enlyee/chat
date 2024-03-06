import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  users: string[];

  @Prop({ required: true })
  lastActivity: Date;

  constructor(name: string, users: string[]) {
    this._id = crypto.randomUUID();
    this.name = name;
    this.users = users;
    this.lastActivity = new Date();
  }
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
