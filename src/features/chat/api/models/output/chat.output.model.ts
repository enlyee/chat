import { ChatDocument } from '../../../domain/chat.entity';

export class ChatOutputModel {
  id: string;
}

export const ChatOutputModelMapper = (chat: ChatDocument): ChatOutputModel => {
  const newChat = new ChatOutputModel();
  newChat.id = chat._id;
  return newChat;
};

export class ChatViewInfo {
  id: string;
  name: string;
  users: string[];
  lastActivity: string;
}

export const UserChatsModelMapper = (chat: ChatDocument): ChatViewInfo => {
  const newChat = new ChatViewInfo();
  newChat.id = chat._id;
  newChat.name = chat.name;
  newChat.users = chat.users;
  newChat.lastActivity = chat.lastActivity.toISOString();
  return newChat;
};
