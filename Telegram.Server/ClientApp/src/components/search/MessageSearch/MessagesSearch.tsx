import {Chat, Message} from "../../../models";
import {useFormInput} from "../../../hooks/useFormInput";
import {Search} from "../../search/Search";
import {Burger} from "../../icons/Burger";
import React, {useCallback, useEffect, useState} from "react";
import {MessageSearchItem} from "./MessageSearchItem";
import {ChatApi} from "../../../api/ChatApi";
import {useAppSelector} from "../../../app/hooks";
import {debounce} from "../../../utils/debounce";

type Props = {
  chat: Chat
  onCloseClick(): void
  onMessageSelect(message: Message): void
}

const itemsPerPage = 20

export const MessagesSearch = ({chat, onCloseClick, onMessageSelect}: Props) => {
  const search = useFormInput("")
  const [messages, setMessages] = useState<Message[]>([])
  const authorizeToken = useAppSelector(state => state.authorization.token)

  const makeMessage = (message: Message) => {
    return <MessageSearchItem
      key={chat.id}
      message={message}
      onClick={onMessageSelect}/>
  }
  const loadFilteredMessages = useCallback(debounce((offset: number, count: number, text: string) => (
    (new ChatApi(chat.id, authorizeToken))
      .messages(offset, count, text)
  ), 500), [chat.id])
  
  useEffect(function searchChanged() {
    const load = async () => {
      setMessages(await loadFilteredMessages(0, itemsPerPage, search.value))
    }
    
    load()
  }, [search.value])
  
  return <div className="search-block">
    <Search
      onChange={search.onChange}
      icon={<Burger onClick={onCloseClick}/>}/>
    <div className="chats scrollbar">
      {messages.map(makeMessage)}
    </div>
  </div>
}