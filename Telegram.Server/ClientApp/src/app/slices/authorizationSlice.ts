import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Chat, User} from "models";
import {nullUser} from "nullables";

type State = {
  currentUser: User
  token: string
}

const initialState = {currentUser: {...nullUser}, token: ''} as State

const authorizationSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    authorize(state, {payload}: PayloadAction<State>) {
      state.currentUser = payload.currentUser
      state.token = payload.token
    },
    addChat(state, {payload}: PayloadAction<Chat>) {
      state.currentUser.chats.push(payload)
    },
    addChats(state, {payload}: PayloadAction<Chat[]>) {
      state.currentUser.chats = payload
    }
  }
})

export const {authorize, addChat, addChats} = authorizationSlice.actions

export const authorizationReducer = authorizationSlice.reducer