import React, {FC} from 'react'
import cat from "public/images/index/cat-3.jpg";
import {Chat} from "models";
import {lastIn} from "utils/lastIn";
import {nullMessage} from "nullables";
import {ReactComponent as Community} from "public/svgs/community.svg";
import {ShortMessageContent} from "components/message/ShortMessageContent";

type Props = {
  chat: Chat
  className: string
  onClick: (chat: Chat) => void
}

export const ChatItem: FC<Props> = ({chat, className = '', onClick}: Props) => {
  const lastMessage = lastIn(chat.messages, nullMessage)

  return (
    <div
      className={'chat-item ' + className}
      onClick={() => onClick(chat)}>
      <img src={cat} alt="" className="circle chat-image"/>
      <div className="chat-item-details">
        <div className="chat-name">
          <Community/>
          <span>{chat.name}</span>
        </div>
        <div className="last-message">
          <span className="last-message-user-name">{lastMessage.author.firstName}: </span>
          <ShortMessageContent content={lastMessage.content}/>
        </div>
      </div>
      <div className="chat-item-right-part">
        <div className="last-message-date">{lastMessage.creationDate}</div>
        <div className="unread-messages-count">2344</div>
      </div>
    </div>
  )
}