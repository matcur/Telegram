import {Chat, Message} from "../../../models";
import React, {FC} from "react";
import {nullChat, nullMessage} from "../../../nullables";
import cat from "../../../public/images/index/cat-3.jpg";
import {ReactComponent as Community} from "../../../public/svgs/community.svg";
import {ShortMessageContent} from "../../message/ShortMessageContent";
import {readableDate} from "../../../utils/datetime/readableDate";

type Props = {
  message: Message
  className?: string
  onClick: (message: Message) => void
}

export const MessageSearchItem: FC<Props> = ({message, className = '', onClick}: Props) => {
  const chat = message.chat || nullChat
  
  return (
    <div
      className={'search-item ' + className}
      onClick={() => onClick(message)}>
      <img src={cat} alt="" className="circle middle-image"/>
      <div className="search-item-details">
        <div className="chat-name">
          <Community/>
          <span>{chat.name}</span>
        </div>
        <div className="message-search">
          <span className="last-message-user-name">{message.author.firstName}: </span>
          <ShortMessageContent content={message.contentMessages.map(c => c.content)}/>
        </div>
      </div>
      <div className="search-item-right-part">
        <div className="search-message-date">{message.creationDate && readableDate(message.creationDate)}</div>
      </div>
    </div>
  )
}