import {Chat, Message, User} from "models";
import {ChatWebsocket} from "./app/chat/ChatWebsocket";

export const nullUser: User = {
  id: -1,
  firstName: '',
  lastName: '',
  chats: [],
  avatarUrl: '',
  friends: []
}

export const nullMessage: Message = {
  id: -1,
  chatId: -1,
  contentMessages: [],
  author: nullUser,
  creationDate: '',
}

export const nullChat: Chat = {
  id: -1,
  name: '',
  messages: [],
  members: [],
}

export const nullChatWebsocket = {
  chatId: -1,
  async start() {},
  onMessageAdded() {},
  removeMessageAdded() {},
  onMessageUpdated() {},
  removeMessageUpdated() {},
  ensureWebhook() {},
  onMessageTyping() {},
  removeMessageTyping() {},
} as unknown as ChatWebsocket