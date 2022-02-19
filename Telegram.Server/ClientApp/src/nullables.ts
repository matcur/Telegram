import {Chat, Message, User} from "models";
import {ChatWebhook} from "./app/chat/ChatWebhook";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {host} from "./api/ApiClient";

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

export const nullChatWebhook = {
  chatId: -1,
  async start() {},
  onMessageAdded() {},
  removeMessageAdded() {},
  emitMessage() {},
} as unknown as ChatWebhook