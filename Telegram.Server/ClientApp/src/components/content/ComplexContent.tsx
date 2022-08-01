import React, {FC, useState} from 'react'
import {Message} from "models";
import {ImagesContent} from "./ImagesContent";
import {TextContent} from "./TextContent";
import {ReplyMessageContent} from "../message/ReplyMessageContent";

type Props = {
  message: Message
  reply?: Message
}

export const ComplexContent: FC<Props> = ({message, reply}: Props) => {
  const content = message.contentMessages.map(c => c.content)
  const images = content.filter(c => c.type === "Image")
  const text = content.find(c => c.type === "Text")
  const [creationDate] = useState(() => new Date(message.creationDate))

  return (
    <div className="complex-content">
      <div className="reply-to-content">
        {reply && <ReplyMessageContent message={reply}/>}
      </div>
      <ImagesContent content={images}/>
      <TextContent content={text} creationDate={creationDate}/>
    </div>
  )
}