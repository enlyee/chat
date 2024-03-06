import { Module, Provider } from '@nestjs/common';
import { UsersController } from './features/users/api/users.controller';
import { UsersService } from './features/users/application/users.service';
import { UsersRepository } from './features/users/infrastructure/users.repository';
import { UsersQueryRepository } from './features/users/infrastructure/users.query.repository';
import { User, UserSchema } from './features/users/domain/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './features/chat/application/chat.service';
import { ChatRepository } from './features/chat/infrastructure/chat.repository';
import { ChatController } from './features/chat/api/chat.controller';
import { Chat, ChatSchema } from './features/chat/domain/chat.entity';
import { ChatQueryRepository } from './features/chat/infrastructure/chat.query.repository';
import { MessagesService } from './features/message/application/messages.service';
import { MessagesRepository } from './features/message/infrastructure/messages.repository';
import {
  Message,
  MessageSchema,
} from './features/message/domain/message.entity';
import { MessagesController } from './features/message/api/messages.controller';
import { MessagesQueryRepository } from './features/message/infrastructure/messages.query.repository';

const usersProviders: Provider[] = [
  UsersService,
  UsersRepository,
  UsersQueryRepository,
];

const chatProviders: Provider[] = [
  ChatService,
  ChatRepository,
  ChatQueryRepository,
];
const messagesProviders: Provider[] = [
  MessagesService,
  MessagesRepository,
  MessagesQueryRepository,
];
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://enlyee:incpass@cluster0.rzs8jwh.mongodb.net/chatNotGpt?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [UsersController, ChatController, MessagesController],
  providers: [...usersProviders, ...chatProviders, ...messagesProviders],
})
export class AppModule {}
