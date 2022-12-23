import React from "react";
import {Message} from "../../models";

type Props = {
  message?: Message
  onReplyClick(message: Message): void
}

// use Menu instead
export const MessageOptions = ({message, onReplyClick}: Props) => {
  return (
    <div className="menu">
      <div
        className="menu-option"
        onClick={() => message && onReplyClick(message)}
      >Reply</div>
    </div>
  )
}