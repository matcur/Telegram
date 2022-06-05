import {Message} from "../../models";
import imageIcon from "../../public/images/image-icon.png";
import React from "react";
import {fullName} from "../../utils/fullName";

type Props = {
  message: Message
}

export const ReplyMessageContent = ({message}: Props) => {
  const content = message.contentMessages.map(c => c.content)
  const text = content.find(c => c.type === 'Text')
  const hasImage = content.find(c => c.type === 'Image')

  return (
    <span className="reply-message-content-wrapper">
      {hasImage && <img src={imageIcon} alt=""/>}
      <div className="reply-message-content">
        <span className="reply-message-user-name">{fullName(message.author)}</span>
        <span className="reply-message-content__text">{text?.value?? ''}</span>
      </div>
    </span>
  )
}