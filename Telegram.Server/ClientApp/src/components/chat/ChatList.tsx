import React, {FC} from 'react'
import {Chat, User} from "models";
import {ChatItem} from './ChatItem';

type Props = {
  selectedChat: Chat
  chats: Chat[]
  onChatSelected(chat: Chat): void
  chatsFiltration(chat: Chat): boolean
  onMessageTyping(chatId: number, callback: (user: User) => void): () => void
}

export const ChatList: FC<Props> = ({selectedChat, onChatSelected, chatsFiltration, chats, onMessageTyping}: Props) => {
  const makeChat = (chat: Chat) => {
    return <ChatItem
      key={chat.id}
      chat={chat}
      className={chat.id === selectedChat.id? 'selected-chat': ''}
      onClick={onChatSelected}
      onMessageTyping={onMessageTyping}
    />
  }

  return (
    <div className="chats scrollbar">
      {chats.filter(chatsFiltration).map(chat => makeChat(chat))}
    </div>
  )
}