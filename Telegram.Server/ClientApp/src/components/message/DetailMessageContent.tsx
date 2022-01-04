import React, {FC} from 'react'
import {Message} from "models";
import {ComplexContent} from "components/content/ComplexContent";

type Props = {
  message: Message
}

export const DetailMessageContent: FC<Props> = ({message}: Props) => {
  const creationDate = new Date(message.creationDate)
  
  return (
    <div className="message-content">
      <ComplexContent content={message.contentMessages.map(c => c.content)}/>
      <div className="message-created-at">
        {`${creationDate.getHours()}:${creationDate.getMinutes()}`}
      </div>
    </div>
  )
}