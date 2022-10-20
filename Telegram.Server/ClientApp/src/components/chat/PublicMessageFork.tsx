import {ChatMessage, ChatMessageProps} from "./ChatMessage";
import React from "react";
import cat from "../../public/images/index/cat-3.jpg";
import {useAppSelector} from "../../app/hooks";
import {fullName} from "../../utils/fullName";
import {DetailMessageContent} from "../message/DetailMessageContent";
import {User} from "../../models";
import {useFunction} from "../../hooks/useFunction";

export type MessageFormProps = ChatMessageProps & {
  onAvatarClick(user: User): void
}

export const PublicMessageFork = (props: MessageFormProps) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const author = props.message.author;
  const isCurrentUser = currentUser.id === author.id;
  
  const onAvatarClick = useFunction(() => {
    props.onAvatarClick(author)
  })
  
  return (
    <ChatMessage {...props}>
      <img
        src={cat}
        alt=""
        className="circle message-author-avatar"
        onClick={onAvatarClick}
      />
      <div className="message-wrapper">
        <div className="message-triangle"/>
        <span className="message-reply">Reply</span>
        {!isCurrentUser && (<div className="message-author-wrapper">
          <span className="message-author">{fullName(author)}</span>
        </div>)}
        <DetailMessageContent
          message={props.message}/>
      </div>
    </ChatMessage>
  )
}