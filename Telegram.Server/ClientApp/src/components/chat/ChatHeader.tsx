import React, {FC, useState} from 'react'
import {Chat, User} from "models";
import {splitByThousands} from "utils/splitByThousands";
import {ReactComponent as Magnifier} from "public/svgs/magnifier.svg";
import {ReactComponent as Star} from "public/svgs/star.svg";
import {ReactComponent as ThreeDot} from "public/svgs/three-dots.svg";
import {IChatWebsocket} from "../../app/chat/ChatWebsocket";
import {MessageInputting} from "../message/MessageInputting";

type Props = {
  chat: Chat
  websocket: IChatWebsocket
  onSearchClick(): void
}

export const ChatHeader: FC<Props> = ({chat, websocket, onSearchClick}: Props) => {
  const [typingUsers, setTypingUsers] = useState<User[]>([])
  
  return (
    <div className="chat-header">
      <div className="chat-details">
        <div className="chat-name">{chat.name}</div>
        <div className="members-count">
          {!typingUsers.length && <span>{splitByThousands(chat.members.length)} members</span>}
          <MessageInputting 
            websocketPromise={websocket}
            setUsers={setTypingUsers}
            users={typingUsers}
          />
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