import {Chat, Message, User} from "models";
import {IChatWebsocket} from "./app/chat/ChatWebsocket";
import {OrderedResizeElement} from "./components/resize/Resize";
import {nope} from "./utils/functions";

export const nullUser: User = {
  id: -1,
  firstName: '',
  lastName: '',
  chats: [],
  avatarUrl: '',
  friends: [],
  bio: '',
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
  onMessageAdded() {return nope},
  removeMessageAdded() {},
  onMessageUpdated() {},
  removeMessageUpdated() {},
  ensureWebhook() {},
  onMessageTyping() {},
  removeMessageTyping() {},
  emitMessageTyping() {},
  onMemberUpdated() {return nope},
  removeMemberUpdated() {},
} as IChatWebsocket

export const nullResizeElement: OrderedResizeElement = {
  type: "resize-element",
  decreaseWidth: () => {},
  increaseWidth: () => {},
  minWidth: () => 0,
  width: () => 0,
}