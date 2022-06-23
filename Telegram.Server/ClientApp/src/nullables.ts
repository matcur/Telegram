import {Chat, Message, User} from "models";
import {ChatWebsocket} from "./app/chat/ChatWebsocket";
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

export const nullChatWebsocket = {
  chatId: -1,
  async start() {},
  onMessageAdded() {},
  removeMessageAdded() {},
  onMessageUpdated() {},
  removeMessageUpdated() {},
  ensureWebhook() {},
} as unknown as ChatWebsocket