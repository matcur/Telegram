import React, {FC, MouseEvent, ReactElement, useState} from 'react'
import {Message, User} from "models";
import {inRowPositionClass} from "utils/inRowPositionClass";
import {DetailMessageContent} from "components/message/DetailMessageContent";
import cat from "public/images/index/cat-3.jpg"
import {useAppSelector} from "app/hooks";
import {ArbitraryElement} from "../up-layer/ArbitraryElement";
import {MessageOptions} from "../message/MessageOptions";

type Props = {
  onDoubleClick: (message: Message) => void
  onRightClick: (element: ReactElement) => void
  replyTo(message: Message): void
  previousAuthor: User
  message: Message
  nextAuthor: User
}

export const ChatMessage: FC<Props> = ({previousAuthor, message, nextAuthor, onDoubleClick, onRightClick, replyTo}: Props) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const currentAuthor = message.author
  const inRowPosition = inRowPositionClass(previousAuthor, message.author, nextAuthor)
  const isCurrentUser = currentUser.id === currentAuthor.id;

  function makeOptions(e: React.MouseEvent<HTMLDivElement>) {
    return <ArbitraryElement
      position={{left: e.clientX, top: e.clientY}}
    >
      <MessageOptions
        message={message}
        onReplyClick={replyTo}
      />
    </ArbitraryElement>
  }

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    onRightClick(makeOptions(e))
  }

  return (
    <div
      onDoubleClick={() => onDoubleClick(message)}
      onContextMenu={onContextMenu}
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