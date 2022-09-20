import {User} from "../../models";
import React, {useEffect, useState} from "react";
import {showTypingTime} from "../../typingSettings";

type Props = {
  users: User[]
  onMessageTyping(callback: (user: User) => void): () => void
  setUsers(value: User[] | ((value: User[]) => User[])): void
}

export const MessageInputting = ({onMessageTyping, users, setUsers}: Props) => {
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
  
  useEffect(() => {
    return onMessageTyping(onTyping)
  }, [])
  
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