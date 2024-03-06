import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  chats: string[];

  constructor(username: string) {
    this._id = crypto.randomUUID(); //for easy work (without ObjectId)
    this.username = username;
    this.chats = [];
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
