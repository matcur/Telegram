import {ChatMessage, ChatMessageProps} from "./ChatMessage";
import React from "react";
import cat from "../../public/images/index/cat-3.jpg";
import {useAppSelector} from "../../app/hooks";
import {fullName} from "../../utils/fullName";
import {DetailMessageContent} from "../message/DetailMessageContent";

export const PublicMessageFork = (props: ChatMessageProps) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const isCurrentUser = currentUser.id === props.message.author.id;
  
  return (
    <ChatMessage {...props}>
      <img src={cat} /** {currentAuthor.avatarUrl} **/ alt="" className="circle message-author-avatar"/>
      <div className="message-wrapper">
        <div className="message-triangle"/>
        <span className="message-reply">Reply</span>
        {!isCurrentUser && (<div className="message-author-wrapper">
          <span className="message-author">{fullName(props.message.author)}</span>
        </div>)}
        <DetailMessageContent
          message={props.message}/>
      </div>
    </ChatMessage>
  )
}