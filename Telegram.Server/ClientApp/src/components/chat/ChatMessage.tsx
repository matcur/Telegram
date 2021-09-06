import React, {FC} from 'react'
import {Message, User} from "models";
import {inRowPositionClass} from "utils/inRowPositionClass";
import {DetailMessageContent} from "components/message/DetailMessageContent";
import cat from "public/images/index/cat-3.jpg"
import {useAppSelector} from "app/hooks";

type Props = {
  onDoubleClick: (message: Message) => void
  previousAuthor: User
  message: Message
  nextAuthor: User
}

export const ChatMessage: FC<Props> = ({previousAuthor, message, nextAuthor, onDoubleClick}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const currentAuthor = message.author
  const inRowPosition = inRowPositionClass(previousAuthor, message.author, nextAuthor)
  const isCurrentUser = currentUser.id === currentAuthor.id;

  return (
    <div
      onDoubleClick={() => onDoubleClick(message)}
      className={[
        "message ",
        inRowPosition,
        isCurrentUser? 'current-user-message': ''
      ].join(' ')}>
      <img src={cat} /** {currentAuthor.avatarUrl} **/ alt="" className="circle message-author-avatar"/>
      <div className="message-wrapper">
        <div className="message-triangle"/>
        <span className="message-reply">Reply</span>
        <span className="message-author">{currentAuthor.firstName + " " + currentAuthor.lastName}</span>
        <DetailMessageContent
          message={message}/>
      </div>
    </div>
  )
}