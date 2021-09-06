import {Chat, Message, User} from "models";

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
  content: [],
  author: nullUser,
  creationDate: '',
}

export const nullChat: Chat = {
  id: -1,
  name: '',
  messages: [],
  members: [],
}