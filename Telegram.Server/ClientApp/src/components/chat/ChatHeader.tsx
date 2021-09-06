import React, {FC} from 'react'
import {Chat} from "models";
import {splitByThousands} from "utils/splitByThousands";
import {ReactComponent as Magnifier} from "public/svgs/magnifier.svg";
import {ReactComponent as Star} from "public/svgs/star.svg";
import {ReactComponent as ThreeDot} from "public/svgs/three-dots.svg";

type Props = {
  chat: Chat
}

export const ChatHeader: FC<Props> = ({chat}: Props) => {
  return (
    <div className="chat-header">
      <div className="chat-details">
        <div className="chat-name">{chat.name}</div>
        <div className="members-count">{splitByThousands(chat.messages.length)} members</div>
      </div>
      <div className="chat-actions">
        <button className="clear-btn chat-action-btn">
          <Magnifier/>
        </button>
        <button className="clear-btn chat-action-btn">
          <Star/>
        </button>
        <button className="clear-btn chat-action-btn">
          <ThreeDot/>
        </button>
      </div>
    </div>
  )
}