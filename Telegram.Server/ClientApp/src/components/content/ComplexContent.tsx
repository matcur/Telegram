import React, {FC} from 'react'
import {Content, Message} from "models";
import {ImagesContent} from "./ImagesContent";
import {TextContent} from "./TextContent";
import {ReplyMessageContent} from "../message/ReplyMessageContent";

type Props = {
  content: Content[]
  reply?: Message
}

export const ComplexContent: FC<Props> = ({content, reply}: Props) => {
  const images = content.filter(c => c.type === "Image")
  const text = content.find(c => c.type === "Text")
  
  return (
    <div className="complex-content">
      <div className="reply-to-content">
        {reply && <ReplyMessageContent message={reply}/>}
      </div>
      <ImagesContent content={images}/>
      <TextContent content={text}/>
    </div>
  )
}