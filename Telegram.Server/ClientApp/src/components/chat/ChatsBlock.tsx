import React, {FC} from 'react'
import {Search} from "components/search/Search";
import {ChatList} from "./ChatList";
import {Chat} from "models";
import {useFormInput} from "hooks/useFormInput";
import {useSetLeftMenuVisible} from "hooks/useSetLeftMenuVisible";
import {Burger} from "components/icons/Burger";
import {ChatWebsockets} from "../../app/chat/ChatWebsockets";

type Props = {
  selectedChat: Chat
  chats: Chat[]
  websockets: ChatWebsockets
  onChatSelected(chat: Chat): void
}

export const ChatsBlock: FC<Props> = ({onChatSelected, selectedChat, chats, websockets}: Props) => {
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
    <div className="search-block">
      <Search
        onChange={search.onChange}
        icon={<Burger onClick={onBurgerClick}/>}/>
      <ChatList
        websockets={websockets}
        chatsFiltration={filtration}
        selectedChat={selectedChat}
        onChatSelected={onChatSelected}
        chats={chats}/>
    </div>
  )
}