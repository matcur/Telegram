import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Chat, Message, User} from "models";
import {nullChat, nullUser} from "nullables";
import {RootState} from "../store";

type State = {
  currentUser: User
  token: string
}

const initialState = {currentUser: {...nullUser}, token: localStorage.getItem('app-authorization-token')} as State

const authorizationSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    authorize(state, {payload}: PayloadAction<State>) {
      state.currentUser = payload.currentUser
      state.token = payload.token
      
      localStorage.setItem('app-authorization-token', payload.token)
      localStorage.setItem(`app-authorization-token-user-id-${payload.currentUser.id}`, payload.token)
    },
    flushToken(state) {
      state.token = ""
      localStorage.setItem('app-authorization-token', "")
    },
    addChat(state, {payload}: PayloadAction<Chat>) {
      state.currentUser.chats.push(payload)
    },
    addChats(state, {payload}: PayloadAction<Chat[]>) {
      state.currentUser.chats = payload
    },
    addMessage(state, {payload}: PayloadAction<{chatId: number, message: Message}>) {
      const chat = selectChats(state).find(c => c.id === payload.chatId)

      if (chat !== undefined) {
        chat.messages.push(payload.message)
      }
    },
    setLastMessage(state, {payload}: PayloadAction<{chatId: number, message: Message}>) {
      const chat = selectChats(state).find(c => c.id === payload.chatId)

      if (chat !== undefined) {
        chat.lastMessage = payload.message
      }
    },
    addMessages(state, {payload}: PayloadAction<{chatId: number, messages: Message[]}>) {
      const chat = selectChats(state).find(c => c.id === payload.chatId)
      if (chat === undefined) {
        return
      }

      payload.messages.forEach(m => chat.messages.push(m))
    },
    addPreviousMessages(state, {payload}: PayloadAction<{chatId: number, messages: Message[]}>) {
      const chat = selectChats(state).find(c => c.id === payload.chatId)
      if (chat === undefined) {
        return
      }
      
      chat.messages.splice(0, 0, ...payload.messages)
    },
    changeAvatar(state, {payload}: PayloadAction<string>) {
      state.currentUser.avatarUrl = payload
    },
    updateMessage(state, {payload: {chatId, updatedMessage}}: PayloadAction<{chatId: number, updatedMessage: Message}>) {
      const chat = state.currentUser.chats.find(c => c.id === chatId)
      if (chat === undefined) {
        return
      }

      const messages = chat.messages;
      const i = messages.findIndex(m => m.id === updatedMessage.id)
      messages.splice(i, 1, updatedMessage)
      
      if (i + 1 === messages.length) {
        chat.lastMessage = updatedMessage
      }
    }
  }
})

export const {
  authorize,
  addChat,
  addChats,
  addMessages,
  addMessage,
  setLastMessage,
  changeAvatar,
  updateMessage,
  addPreviousMessages,
  flushToken,
} = authorizationSlice.actions

export const authorizationReducer = authorizationSlice.reducer

export const chatMessages = (state: RootState, chatId: number) => {
  return detailChat(state, chatId).messages
}

export const detailChat = (state: RootState, id: number) => {
  const chats = selectChats(state.authorization)

  if (!chats.some(chat => chat.id === id)) {
    return nullChat
  }

  return chats.find(chat => chat.id === id)!
}

export const selectChats = (state: State) => {
  return state.currentUser.chats
}

export const selectCurrentUserId = (state: RootState) => {
  return state.authorization.currentUser.id
}
