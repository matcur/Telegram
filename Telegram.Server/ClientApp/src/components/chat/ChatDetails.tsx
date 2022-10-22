import {Chat, User} from "../../models";
import React, {useState} from "react";
import {splitByThousands} from "../../utils/splitByThousands";
import {MessageInputting} from "../message/MessageInputting";
import {useFunction} from "../../hooks/useFunction";
import {onMessageTyping} from "../../app/websockets/chatWebsocket";

type DetailProps = {
  chat: Chat
}
export const ChatDetails = ({chat}: DetailProps) => {
  const [typingUsers, setTypingUsers] = useState<User[]>([])

  return(
    <div className="chat-details">
      <div className="chat-name">{chat.name}</div>
      <div className="members-count">
        {!typingUsers.length && <span>{splitByThousands(chat.members.length)} members</span>}
        <MessageInputting
          setUsers={setTypingUsers}
          users={typingUsers}
          chatId={chat.id}
        />
      </div>
    </div>
  )
}