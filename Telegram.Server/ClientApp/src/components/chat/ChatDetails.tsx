import {Chat, User} from "../../models";
import React, {useState} from "react";
import {splitByThousands} from "../../utils/splitByThousands";
import {MessageInputting} from "../message/MessageInputting";
import {useFunction} from "../../hooks/useFunction";

type DetailProps = {
  chat: Chat
  onMessageTyping(chatId: number, callback: (user: User) => void): () => void
}
export const ChatDetails = ({chat, onMessageTyping}: DetailProps) => {
  const [typingUsers, setTypingUsers] = useState<User[]>([])
  const onMessageTypingWrap = useFunction(onMessageTyping.bind(null, chat.id))

  return(
    <div className="chat-details">
      <div className="chat-name">{chat.name}</div>
      <div className="members-count">
        {!typingUsers.length && <span>{splitByThousands(chat.members.length)} members</span>}
        <MessageInputting
          setUsers={setTypingUsers}
          users={typingUsers}
          onMessageTyping={onMessageTypingWrap}
        />
      </div>
    </div>
  )
}