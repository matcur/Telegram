import React, {FC, useCallback} from 'react'
import {Search} from "components/search/Search";
import {ChatList} from "./ChatList";
import {Chat} from "models";
import {useFormInput} from "hooks/useFormInput";
import {useSetLeftMenuVisible} from "hooks/useSetLeftMenuVisible";
import {Burger} from "components/icons/Burger";
import {ChatWebsockets} from "../../app/chat/ChatWebsockets";
import {compareObjectDate} from "../../utils/compareObjectDate";

type Props = {
  selectedChat: Chat
  chats: Chat[]
  websockets: ChatWebsockets
  onChatSelected(chat: Chat): void
}

export const ChatsBlock: FC<Props> = ({onChatSelected, selectedChat, chats, websockets}: Props) => {
  const search = useFormInput('')
  const setLeftMenuVisible = useSetLeftMenuVisible()

  const onBurgerClick = useCallback(() => {
    setLeftMenuVisible(true)
  }, [])
  const filtration = useCallback((chat: Chat) => {
    const value = search.value;

    return value === '' || chat.name.includes(value)
  }, [search.value])

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
        chats={[...chats].sort(compareObjectDate("updatedDate"))}/>
    </div>
  )
}