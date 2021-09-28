import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Chat, Message} from "models";
import {nullChat} from "nullables";
import {removeFrom} from "utils/removeFrom";
import {RootState} from "app/store";
import {maxId} from "utils/maxId";

type State = {
  list: Chat[]
}

const newMessage = (message: Omit<Message, 'id' | 'creationDate'>, messages: Message[]) => {
  return {...message, id: maxId(messages), creationDate: (new Date()).toDateString()}
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {list: []} as State,
  reducers: {
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

export const { addChatRange, remove, updateMessage } = chatsSlice.actions

export const chatsReducer = chatsSlice.reducer