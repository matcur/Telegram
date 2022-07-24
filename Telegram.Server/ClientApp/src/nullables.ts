import {Chat, Message, User} from "models";
import {IChatWebsocket} from "./app/chat/ChatWebsocket";

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
  authorId: -1,
  contentMessages: [],
  author: nullUser,
  creationDate: '',
  type: "UserMessage",
  associatedUsers: [],
}

export const nullChat: Chat = {
  id: -1,
  name: '',
  messages: [],
  members: [],
  updatedDate: '',
}

export const nullChatWebsocket = {
  chatId() {return -1},
  async start() {},
  onMessageAdded() {},
  removeMessageAdded() {},
  onMessageUpdated() {},
  removeMessageUpdated() {},
  ensureWebhook() {},
  onMessageTyping() {},
  removeMessageTyping() {},
  emitMessageTyping() {}
} as IChatWebsocket