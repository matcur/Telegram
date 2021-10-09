import React, {FC, useEffect} from 'react'
import {Chat, Message} from "models";
import {useAppDispatch, useAppSelector} from "app/hooks";
import { ChatItem } from './ChatItem';
import {addChats, setLastMessage} from "app/slices/authorizationSlice";
import {AuthorizedUserApi} from "api/AuthorizedUserApi";
import {useWebhook} from "../../hooks/useWebhook";

type Props = {
  selectedChat: Chat
  onChatSelected: (chat: Chat) => void
  chatsFiltration: (chat: Chat) => boolean
}

export const ChatList: FC<Props> = ({selectedChat, onChatSelected, chatsFiltration}: Props) => {
  const chats = useAppSelector(state => state.authorization.currentUser.chats)
  const token = useAppSelector(state => state.authorization.token)
  const chatsWebhook = useWebhook('chats', [])
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (token === '') {
      return
    }
    const load = async() => {
      const response = await new AuthorizedUserApi(token).chats()
      dispatch(addChats(response.result))
    }

    load()
  }, [])
  
  useEffect(() => {
    chatsWebhook?.on('ReceiveMessage', receiveMessage)
  }, [chatsWebhook])

  const receiveMessage = (chatId: number, messageJson: string) => {
    const message = JSON.parse(messageJson) as Message

    console.log('received')
    dispatch(setLastMessage({chatId, message}))
  }

  const makeChat = (chat: Chat) => {
    return <ChatItem
      key={chat.id}
      chat={chat}
      className={chat === selectedChat? 'selected-chat': ''}
      onClick={onChatSelected}/>
  }

  return (
    <div className="chats scrollbar">
      {chats.filter(chatsFiltration).map(chat => makeChat(chat))}
    </div>
  )
}