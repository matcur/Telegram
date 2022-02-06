import React, {FC, useEffect} from 'react'
import {Chat, Message} from "models";
import { ChatItem } from './ChatItem';

type Props = {
  selectedChat: Chat
  onChatSelected: (chat: Chat) => void
  chatsFiltration: (chat: Chat) => boolean
  chats: Chat[]
}

export const ChatList: FC<Props> = ({selectedChat, onChatSelected, chatsFiltration, chats}: Props) => {
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