import {Chat, User} from "../../models";
import {IChatWebsocket} from "../../app/chat/ChatWebsocket";
import React, {useState} from "react";
import {splitByThousands} from "../../utils/splitByThousands";
import {MessageInputting} from "../message/MessageInputting";

type DetailProps = {
  chat: Chat
  websocket: IChatWebsocket
}
export const ChatDetails = ({chat, websocket}: DetailProps) => {
  const [typingUsers, setTypingUsers] = useState<User[]>([])

  return(
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
  )
}