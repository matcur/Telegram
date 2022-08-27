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
      state.token = ''
      localStorage.setItem('app-authorization-token', '')
      localStorage.setItem(`app-authorization-token-user-id-${state.currentUser.id}`, '')
    },
    updateAuthorizedUser(state, {payload}: PayloadAction<User>) {
      state.currentUser = {
        ...state.currentUser,
        ...payload,
      }
    },
    updateFriend(state, {payload}: PayloadAction<User>) {
      const friends = state.currentUser.friends || [];
      const index = friends.findIndex(f => f.id === payload.id)
      if (index >= 1) {
        friends.splice(index, 1, payload)
      }
    },
    addChat(state, {payload}: PayloadAction<Chat>) {
      state.currentUser.chats.push(payload)
    },
    addChats(state, {payload}: PayloadAction<Chat[]>) {
      state.currentUser.chats = payload
    },
    unshiftChat(state, {payload}: PayloadAction<Chat>) {
      state.currentUser.chats.unshift(payload)
    },
    changeChatUpdatedDate(state, {payload: {chatId, value}}: PayloadAction<{chatId: number, value: string}>) {
      const chat = state.currentUser.chats.find(c => c.id === chatId)
      if (chat) {
        chat.updatedDate = value
      }
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
      if (!chat) {
        return
      }
      
      chat.messages.unshift(...payload.messages)
    },
    changeAvatar(state, {payload}: PayloadAction<string>) {
      state.currentUser.avatarUrl = payload
    },
    updateMessage(state, {payload: message}: PayloadAction<Message>) {
      const chat = state.currentUser.chats.find(c => c.id === message.chatId)
      if (chat === undefined) {
        return
      }

      const messages = chat.messages;
      const i = messages.findIndex(m => m.id === message.id)
      messages.splice(i, 1, message)
      
      if (i + 1 === messages.length) {
        chat.lastMessage = message
      }
    },
    addChatMembers(state, {payload: {chatId, members}}: PayloadAction<{chatId: number, members: User[]}>) {
      const chat = state.currentUser.chats.find(c => c.id === chatId)
      if (!chat) return
      
      chat.members.push(...members)
    }
  }
})

export const {
  authorize,
  addChat,
  unshiftChat,
  addChats,
  addMessages,
  addMessage,
  setLastMessage,
  changeAvatar,
  updateMessage,
  addPreviousMessages,
  flushToken,
  changeChatUpdatedDate,
  addChatMembers,
  updateAuthorizedUser,
  updateFriend,
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
