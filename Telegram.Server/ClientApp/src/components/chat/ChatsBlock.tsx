import React, {FC, useContext} from 'react'
import {Search} from "components/search/Search";
import {ChatList} from "./ChatList";
import {Chat, User} from "models";
import {useFormInput} from "hooks/useFormInput";
import {Burger} from "components/icons/Burger";
import {compareObjectDate} from "../../utils/compareObjectDate";
import {LeftMenuContext} from "../../contexts/LeftMenuContext";
import {useFunction} from "../../hooks/useFunction";

type Props = {
  selectedChat: Chat
  chats: Chat[]
  onChatSelected(chat: Chat): void
}

export const ChatsBlock: FC<Props> = ({onChatSelected, selectedChat, chats}) => {
  const search = useFormInput('')
  const leftMenu = useContext(LeftMenuContext)

  const onBurgerClick = useFunction(() => {
    leftMenu.show()
  })
  const filtration = useFunction((chat: Chat) => {
    const value = search.value;

    return value === '' || chat.name?.includes(value)
  })

  return (
    <div className="search-block">
      <Search
        onChange={search.onChange}
        icon={<Burger onClick={onBurgerClick}/>}/>
      <ChatList
        chatsFiltration={filtration}
        selectedChat={selectedChat}
        onChatSelected={onChatSelected}
        chats={[...chats].sort(compareObjectDate("updatedDate"))}
      />
    </div>
  )
}