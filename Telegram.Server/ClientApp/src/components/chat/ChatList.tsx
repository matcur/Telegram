import React, {FC} from 'react'
import {Chat} from "models";
import {ChatItem} from './ChatItem';
import {ChatWebsockets} from "../../app/chat/ChatWebsockets";
import {useAppSelector} from "../../app/hooks";

type Props = {
  selectedChat: Chat
  chats: Chat[]
  websockets: ChatWebsockets
  onChatSelected(chat: Chat): void
  chatsFiltration(chat: Chat): boolean
}

export const ChatList: FC<Props> = ({selectedChat, onChatSelected, chatsFiltration, chats, websockets}: Props) => {
  const token = useAppSelector(state => state.authorization.token)
  
  const makeChat = (chat: Chat) => {
    return <ChatItem
      key={chat.id}
      chat={chat}
      className={chat.id === selectedChat.id? 'selected-chat': ''}
      onClick={onChatSelected}
      websocket={websockets.get(chat.id, token)}
    />
  }

  return (
    <div className="chats scrollbar">
      {chats.filter(chatsFiltration).map(chat => makeChat(chat))}
    </div>
  )
}