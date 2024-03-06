import { MessageDocument } from '../../../domain/message.entity';

export class MessageOutputModel {
  id: string;
}

export const MessageOutputModelMapper = (
  message: MessageDocument,
): MessageOutputModel => {
  const newMessage = new MessageOutputModel();
  newMessage.id = message._id;
  return newMessage;
};

export class MessageViewModel {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export const ChatViewModelMapper = (
  message: MessageDocument,
): MessageViewModel => {
  const newChat = new MessageViewModel();
  newChat.id = message._id;
  newChat.author = message.author;
  newChat.text = message.text;
  newChat.createdAt = message.createdAt.toISOString();
  return newChat;
};
