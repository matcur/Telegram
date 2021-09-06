import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Chat, Message} from "models";
import {nullChat} from "nullables";
import {removeFrom} from "utils/removeFrom";
import {RootState} from "app/store";
import {maxId} from "utils/maxId";
import {Writable} from "stream";

type State = {
  list: Chat[]
}

const baseMessage: Omit<Message, 'content'> = {
  id: 1,
  author: {id: 1, firstName: 'Jon', lastName: 'Yon', chats: [], avatarUrl: ''},
  chatId: 1,
  creationDate: 'f',
}
let mess1 = {...baseMessage, content: [{type: 'Text', value: 'Some text', displayOrder: 1000}]};
let mess2 = {...baseMessage, content: [{type: 'Text', value: 'Some text 2', displayOrder: 1000}]};
let mess3 = {...baseMessage, content: [{type: 'Text', value: 'Some text 3', displayOrder: 1000}]};
export const initialState = {list: [
    {id: 1, name: 'React', messages: [mess2, {...mess1, author: {id: 4, firstName: 'Jon 2', lastName: 'Yon 2', chats: [], avatarUrl: ''}}, mess1, mess2], members: []},
    {id: 2, name: 'Typescript', messages: [mess2, mess3], members: []},
    {id: 3, name: 'Vue', messages: [mess3, mess1, mess2, mess1, mess2, mess1, mess2, mess1, mess2, mess1, mess2, mess1, mess2], members: []},
  ]} as State

const newMessage = (message: Omit<Message, 'id' | 'creationDate'>, messages: Message[]) => {
  return {...message, id: maxId(messages), creationDate: (new Date()).toDateString()}
}

// Todo ref this shit
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addMessage(state, {payload}: PayloadAction<{chatId: number, message: Omit<Message, 'id' | 'creationDate'>}>) {
      const chat = state.list.find(c => c.id === payload.chatId)

      chat?.messages.push(newMessage(payload.message, chat.messages))
    },
    addMessages(state, {payload}: PayloadAction<{chatId: number, messages: Omit<Message, 'id' | 'creationDate'>[]}>) {
      const chat = state.list.find(c => c.id === payload.chatId)
      if (chat === undefined) {
        return
      }

      payload.messages.forEach(m => chat.messages.push(newMessage(m, chat.messages)))
    },
    addChatRange(state, {payload}: PayloadAction<Chat[]>) {
      payload.forEach(chat => {
        state.list.push(chat)
      })
    },
    remove(state, {payload}: PayloadAction<Chat>) {
      removeFrom(state.list, payload)
    },
    updateMessage(state, {payload}: PayloadAction<{chatId: number, message: Message}>) {
      const chat = state.list.find(c => c.id === payload.chatId)
      if (chat === undefined) {
        return
      }

      removeFrom(chat.messages, payload.message)
      chat.messages.push(payload.message)
    }
  }
})

export const { addChatRange, remove, addMessage, addMessages, updateMessage } = chatsSlice.actions

export const chatsReducer = chatsSlice.reducer

export const detailChat = (state: RootState, id: number) => {
  const chats = state.chats.list

  if (!chats.some(chat => chat.id === id)) {
    return nullChat
  }

  return chats.find(chat => chat.id === id)!
}

export const chatMessages = (state: RootState, id: number) => {
  return detailChat(state, id).messages
}