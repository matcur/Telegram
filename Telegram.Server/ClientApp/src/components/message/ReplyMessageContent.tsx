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
  const image = content.find(c => c.type === 'Image')

  return (
    <span className="reply-message-content-wrapper">
      {image && <img src={image.value} className="small-image"/>}
      <div className="reply-message-content">
        <span className="reply-message-user-name">{fullName(message.author)}</span>
        <span className="reply-message-content__text">{text?.value?? ''}</span>
      </div>
    </span>
  )
}