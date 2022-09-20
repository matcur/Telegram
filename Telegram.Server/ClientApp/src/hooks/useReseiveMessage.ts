import {addMessage, setLastMessage, unshiftChat} from "../app/slices/authorizationSlice";
import {useCallback, useMemo, useRef, useState} from "react";
import {Chat as ChatModel, Message} from "../models";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../app/hooks";
import {AuthorizedUserApi} from "../api/AuthorizedUserApi";
import {useToken} from "./useToken";

export const useReceiveMessage = () => {
  const chatsRef = useRef<ChatModel[]>([])
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const token = useToken()
  const authorizedUser = useMemo(() => new AuthorizedUserApi(token), [token])
  const chats = currentUser.chats
  const dispatch = useDispatch()
  chatsRef.current = chats
  
  return useCallback(async (message: Message) => {
    const chats = chatsRef.current;
    if (!chats.some(c => c.id === message.chatId)) {
      const chat = await authorizedUser.chat(message.chatId)
      dispatch(unshiftChat(chat))
    }

    dispatch(setLastMessage({chatId: message.chatId, message}))
    dispatch(addMessage({chatId: message.chatId, message}))
  }, [])
}