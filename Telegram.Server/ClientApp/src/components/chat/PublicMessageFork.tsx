import {ChatMessage, ChatMessageProps} from "./ChatMessage";
import React from "react";
import cat from "../../public/images/index/cat-3.jpg";
import {useAppSelector} from "../../app/hooks";
import {fullName} from "../../utils/fullName";
import {DetailMessageContent} from "../message/DetailMessageContent";

export const PublicMessageFork = (props: ChatMessageProps) => {
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const isCurrentUser = currentUser.id === props.message.author.id;
  
  // const currentUser = useAppSelector(state => state.authorization.currentUser)
  // const contents = props.message.contentMessages.map(c => c.content)
  // const hasImage = contents.some(c => c.type === "Image")
  // const hasText = contents.some(c => c.type === "Text")
  //
  // const onContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   props.onRightClick(props.message, e)
  // }, [props.onRightClick])
  //
  // if (hasImage && !hasText) {
  //   const inRowPosition = inRowPositionClass(props.previousAuthor, props.message.author, props.nextAuthor)
  //   const currentAuthor = props.message.author
  //   const isCurrentUser = currentUser.id === currentAuthor.id;
  //  
  //   return (
  //     <div
  //       onDoubleClick={() => props.onDoubleClick(props.message)}
  //       onContextMenu={onContextMenu}
  //       className={classNames(
  //         "message",
  //         inRowPosition,
  //         {'current-user-message': isCurrentUser}
  //       )}>
  //       <img src={cat} /** {currentAuthor.avatarUrl} **/ alt="" className="circle message-author-avatar"/>
  //       <img src={imageContent(contents)[0].value} alt="" className="image-content"/>
  //     </div>
  //   )
  // }
  
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