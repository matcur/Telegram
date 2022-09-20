import {Chat, User} from "../../models";
import React, {useCallback, useState} from "react";
import {splitByThousands} from "../../utils/splitByThousands";
import {MessageInputting} from "../message/MessageInputting";

type DetailProps = {
  chat: Chat
  onMessageTyping(chatId: number, callback: (user: User) => void): () => void
}
export const ChatDetails = ({chat, onMessageTyping}: DetailProps) => {
  const [typingUsers, setTypingUsers] = useState<User[]>([])
  const onMessageTypingWrap = useCallback(onMessageTyping.bind(null, chat.id), [chat.id])

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