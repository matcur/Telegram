import React, {FC, useMemo, useState} from 'react'
import cat from "public/images/index/cat-3.jpg";
import {Chat, User} from "models";
import {nullMessage} from "nullables";
import {ReactComponent as Community} from "public/svgs/community.svg";
import {ShortMessageContent} from "components/message/ShortMessageContent";
import {readableDate} from "../../utils/datetime/readableDate";
import {MessageInputting} from "../message/MessageInputting";

type Props = {
  chat: Chat
  className?: string
  onClick(chat: Chat): void
  onMessageTyping(chatId: number, callback: (user: User) => void): () => void
}

export const ChatItem: FC<Props> = ({chat, className = '', onClick, onMessageTyping}: Props) => {
  const [typingUsers, setTypingUsers] = useState<User[]>([])
  const lastMessage = chat.lastMessage?? nullMessage
  const onMessageTypingWrap = useMemo(() => {
    return onMessageTyping.bind(null, chat.id)
  }, [onMessageTyping, chat.id])
  
  return (
    <div
      className={'search-item ' + className}
      onClick={() => onClick(chat)}>
      <img src={cat} alt="" className="circle middle-image"/>
      <div className="search-item-details">
        <div className="chat-name">
          <Community/>
          <span>{chat.name}</span>
        </div>
        <div className="message-search">
          {!typingUsers.length && (
            <>
              <span className="last-message-user-name">{lastMessage.author.firstName}: </span>
              <ShortMessageContent content={lastMessage.contentMessages.map(c => c.content)}/>
            </>
          )}
          <MessageInputting
            setUsers={setTypingUsers}
            users={typingUsers}
            onMessageTyping={onMessageTypingWrap}
          />
        </div>
      </div>
      <div className="search-item-right-part">
        <div className="search-message-date">{lastMessage.creationDate && readableDate(lastMessage.creationDate)}</div>
        {chat.unreadMessageCount !== 0 && <div className="unread-messages-count">{chat.unreadMessageCount}</div>}
      </div>
    </div>
  )
}