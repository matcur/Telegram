import React from "react";
import {Message} from "../../models";
import {imageContent} from "../../utils/imageContent";

type Props = {
  message: Message
}

export const ReplyContent = ({message}: Props) => {
  const image = imageContent(message)[0]
  
  return (
    <div className="reply-content">
      {image && <img src={image.value} className="small-image"/>}
    </div>
  )
}