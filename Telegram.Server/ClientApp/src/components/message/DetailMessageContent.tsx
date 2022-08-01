import React, {FC} from 'react'
import {Message} from "models";
import {ComplexContent} from "components/content/ComplexContent";

type Props = {
  message: Message
}

export const DetailMessageContent: FC<Props> = ({message}: Props) => {
  return (
    <div className="message-content">
      <ComplexContent reply={message.replyTo} message={message}/>
    </div>
  )
}