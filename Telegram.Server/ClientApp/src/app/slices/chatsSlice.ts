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
    }
  }
})

export const { addChatRange, remove } = chatsSlice.actions

export const chatsReducer = chatsSlice.reducer