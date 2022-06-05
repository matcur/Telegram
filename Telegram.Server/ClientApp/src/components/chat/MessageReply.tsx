import {Message} from "../../models";
import React from "react";
import {ReplyMessageContent} from "../message/ReplyMessageContent";

type Props = {
  message: Message
  onCloseClick(): void
}

export const MessageReply = ({message, onCloseClick}: Props) => {
  return (
    <div className="replying-message">
      <ReplyMessageContent message={message}/>
      <div onClick={onCloseClick}>close</div>
    </div>
  )
}