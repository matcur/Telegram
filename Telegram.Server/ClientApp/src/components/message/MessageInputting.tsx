import {User} from "../../models";
import {IChatWebsocket} from "../../app/chat/ChatWebsocket";
import {useEffect, useState} from "react";
import {nullChatWebsocket} from "../../nullables";

type Props = {
  websocketPromise: IChatWebsocket | Promise<IChatWebsocket>
  users: User[]
  setUsers(value: User[] | ((value: User[]) => User[])): void
}

export const showTypingTime = 500

export const typingThrottleTime = showTypingTime - 100

// TODO change websocketPromise to function with ability to subscribe by id what about illy klimov talk
export const MessageInputting = ({websocketPromise, users, setUsers}: Props) => {
  const [websocket, setWebsocket] = useState<IChatWebsocket>(nullChatWebsocket)
  const displayedUsers = users
    .sort((a, b) => a.firstName > b.firstName ? 1 : -1)
    .slice(0, 3)
  
  const onTyping = (user: User) => {
    setUsers(users => {
      const index = users.findIndex(u => u.id === user.id)
      if (index > -1) {
        users.splice(index, 1)
      }
      return [...users, user]
    })
    setTimeout(() => {
      setUsers(users => {
        const index = users.indexOf(user)
        const newUsers = [...users]
        if (index > -1) {
          newUsers.splice(index, 1)
        }
        
        return newUsers
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
  
  useEffect(() => {
    return () => setUsers([])
  }, [])
  
  if (!displayedUsers.length) {
    return null
  }
  
  return (
    <span className="message-typing">
      {displayedUsers.map(u => u.firstName).join(" and ")} typing message   
    </span>
  )
}