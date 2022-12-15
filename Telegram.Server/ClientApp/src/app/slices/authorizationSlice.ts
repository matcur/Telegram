import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Chat, Message, User} from "models";
import {nullChat, nullUser} from "nullables";
import {RootState} from "../store";
import {Theme} from "../../providers/ThemeProvider";
import {storedTheme} from "../../utils/storedTheme";
import {chatWebsocketExists, initChatWebsocket} from "../websockets/chatWebsocket";
import {initUserWebhook} from "../websockets/userWebsocket";

type State = {
  currentUser: User
  token: string
  theme: Theme
}

const initialState: State = {
  currentUser: {...nullUser},
  token: localStorage.getItem('app-authorization-token') || "",
  theme: storedTheme(),

}

const authorizationSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    authorize(state, {payload}: PayloadAction<Pick<State, 'currentUser' | 'token'>>) {
      state.currentUser = payload.currentUser
      state.token = payload.token
      initUserWebhook(state.currentUser.id, payload.token)
      
      localStorage.setItem('app-authorization-token', payload.token)
      localStorage.setItem(`app-authorization-token-user-id-${payload.currentUser.id}`, payload.token)
    },
    flushToken(state) {
      state.token = ''
      localStorage.setItem('app-authorization-token', '')
      localStorage.setItem(`app-authorization-token-user-id-${state.currentUser.id}`, '')
    },
    choiceTheme(state, {payload}: PayloadAction<Theme>) {
      state.theme = payload
      localStorage.setItem('theme', payload)
    },
    updateAuthorizedUser(state, {payload}: PayloadAction<Partial<User>>) {
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
    addChats(state, {payload}: PayloadAction<Chat[]>) {
      const newChats = payload.filter(c => !state.currentUser.chats.some(addedChat => addedChat.id === c.id))
      newChats.forEach(c => initChatWebsocket(c.id, state.token))
      state.currentUser.chats = [
        ...state.currentUser.chats,
        ...newChats,
      ]
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
    },
    updateChatMember(state, {payload: {chatId, member}}: PayloadAction<{chatId: number, member: User}>) {
      const chat = state.currentUser.chats.find(c => c.id === chatId)
      if (!chat) return

      chat.messages?.forEach(m => {
        if (m.author.id === member.id) {
          return m.author = {...m.author, ...member}
        }
        return m
      })
      const lastMessage = chat.lastMessage
      if (lastMessage?.author.id === member.id) {
        lastMessage.author = {...lastMessage.author, ...member}
      }
    },
    changeUnreadCount(state, {payload: {chatId, unreadCount}}: PayloadAction<{chatId: number, unreadCount: number}>) {
      const chat = state.currentUser.chats.find(c => c.id === chatId)
      if (!chat) return
      
      chat.unreadMessageCount = unreadCount
    }
  }
})

export const {
  authorize,
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
  choiceTheme,
  updateChatMember,
  changeUnreadCount,
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
