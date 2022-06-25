import React, {FC} from 'react'
import {Chat} from "models";
import {splitByThousands} from "utils/splitByThousands";
import {ReactComponent as Magnifier} from "public/svgs/magnifier.svg";
import {ReactComponent as Star} from "public/svgs/star.svg";
import {ReactComponent as ThreeDot} from "public/svgs/three-dots.svg";
import {ChatWebsocket} from "../../app/chat/ChatWebsocket";
import {MessageInputting} from "../message/MessageInputting";

type Props = {
  chat: Chat
  websocket: ChatWebsocket
  onSearchClick(): void
}

export const ChatHeader: FC<Props> = ({chat, websocket, onSearchClick}: Props) => {
  return (
    <div className="chat-header">
      <div className="chat-details">
        <div className="chat-name">{chat.name}</div>
        <div className="members-count">
          <span>{splitByThousands(chat.messages.length)} members </span>
          <MessageInputting websocketPromise={websocket} setTyping={() => {}}/>
        </div>
      </div>
      <div className="chat-actions">
        <button className="clear-btn chat-action-btn" onClick={onSearchClick}>
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