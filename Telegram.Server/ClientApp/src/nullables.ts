import {Chat, Message, User} from "models";
import {OrderedResizeElement} from "./components/resize/Resize";
import {Position} from "./utils/type";

export const nullUser: User = {
  id: -1,
  firstName: '',
  lastName: '',
  chats: [],
  avatarUrl: '',
  friends: [],
  bio: '',
  lastActiveTime: '',
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

export const nullResizeElement: OrderedResizeElement = {
  type: "resize-element",
  decreaseWidth: () => {},
  increaseWidth: () => {},
  minWidth: () => 0,
  width: () => 0,
}

export const nullPosition: Position = {top: 0, left: 0}