import React, {FC, useState} from 'react'
import {Search} from "components/search/Search";
import {ChatList} from "./ChatList";
import {Chat} from "models";
import {useFormInput} from "hooks/useFormInput";
import {useSetLeftMenuVisible} from "hooks/useSetLeftMenuVisible";
import {Burger} from "components/icons/Burger";

type Props = {
  onChatSelected: (chat: Chat) => void
  selectedChat: Chat
}

export const ChatsBlock: FC<Props> = ({onChatSelected, selectedChat}: Props) => {
  const search = useFormInput('')
  const setLeftMenuVisible = useSetLeftMenuVisible()

  const onBurgerClick = () => {
    setLeftMenuVisible(true)
  }
  const filtration = (chat: Chat) => {
    const value = search.value;

    return value === '' || chat.name.includes(value)
  }

  return (
    <div className="chats-block">
      <Search
        onChange={search.onChange}
        icon={<Burger onClick={onBurgerClick}/>}/>
      <ChatList
        chatsFiltration={filtration}
        selectedChat={selectedChat}
        onChatSelected={onChatSelected}/>
    </div>
  )
}