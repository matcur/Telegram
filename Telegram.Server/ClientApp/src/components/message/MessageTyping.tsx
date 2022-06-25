import {User} from "../../models";
import {ChatWebsocket} from "../../app/chat/ChatWebsocket";
import {useEffect, useState} from "react";
import {nullChatWebsocket} from "../../nullables";

type Props = {
  websocketPromise: ChatWebsocket | Promise<ChatWebsocket>
  setTyping(value: boolean): void
}

export const showTypingTime = 500

export const typingThrottleTime = showTypingTime - 100

export const MessageTyping = ({websocketPromise, setTyping}: Props) => {
  const [websocket, setWebsocket] = useState<ChatWebsocket>(nullChatWebsocket)
  const [users, setUsers] = useState<User[]>([])
  const displayedUsers = users
    .sort((a, b) => a.firstName > b.firstName ? 1 : -1)
    .slice(0, 3)
  
  const onUserCountChange = (users: User[]) => {
    setTyping(Boolean(users.length))
    return users
  }
  
  const onTyping = (user: User) => {
    setUsers(users => {
      const index = users.findIndex(u => u.id === user.id)
      if (index > -1) {
        users.splice(index, 1)
      }
      return onUserCountChange([...users, user])
    })
    setTimeout(() => {
      setUsers(users => {
        const index = users.indexOf(user)
        const newUsers = [...users]
        if (index > -1) {
          newUsers.splice(index, 1)
        }
        
        return onUserCountChange(newUsers)
      })
    }, showTypingTime)
  }
  
  useEffect(function subscribeOnTyping() {
    websocket.onMessageTyping(onTyping)
    return () => websocket.removeMessageTyping(onTyping)
  }, [websocket])
  
  useEffect(function awaitWebsocket() {
    if (websocketPromise instanceof Promise) {
      websocketPromise.then(setWebsocket)
    } else {
      setWebsocket(websocketPromise)
    }
  }, [websocketPromise])
  
  if (!displayedUsers.length) {
    return null
  }
  
  return (
    <span className="message-typing">
      {displayedUsers.map(u => u.firstName).join(" and ")} typing message   
    </span>
  )
}