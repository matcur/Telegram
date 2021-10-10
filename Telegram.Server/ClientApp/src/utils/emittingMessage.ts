import {Message} from "../models";

// rest only emitting need message fields 
export const emittingMessage = (message: Message) => {
  return {
    id: message.id,
    author: {...message.author, chats: []},
    content: message.content,
    chatId: message.chatId,
    creationDate: message.creationDate,
  }
}