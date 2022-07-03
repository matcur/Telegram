import React, {useCallback, useEffect, useRef, useState} from 'react'
import {ChatsBlock} from "components/chat/ChatsBlock";
import {Chat} from "components/chat/Chat";
import {nullChat, nullChatWebsocket} from "nullables";
import {useAppSelector} from "../app/hooks";
import {Message} from "../models";
import {addChats, addMessage, setLastMessage, unshiftChat} from "../app/slices/authorizationSlice";
import {useDispatch} from "react-redux";
import {ChatWebsockets} from "../app/chat/ChatWebsockets";
import {AuthorizedUserApi} from "../api/AuthorizedUserApi";
import {Chat as ChatModel} from "models";
import {MessagesSearch} from "../components/search/MessageSearch/MessagesSearch";

type Search = {
  type: "chats"
} | {
  type: "messages",
  inChat: ChatModel,
}

export const Index = () => {
  const [selectedChat, setSelectedChat] = useState(nullChat)
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  // needs for websocket callback
  const chatsRef = useRef<ChatModel[]>([])
  const chats = currentUser.chats
  chatsRef.current = chats
  const token = useAppSelector(state => state.authorization.token)
  const [chatWebsockets] = useState(() => new ChatWebsockets())
  const [chatWebsocket, setChatWebsocket] = useState(nullChatWebsocket)
  const [search, setSearch] = useState<Search>(() => ({type: "chats"}))
  const [authorizedUser, setAuthorizedUser] = useState(() => new AuthorizedUserApi(token))
  const dispatch = useDispatch()

  useEffect(() => {
    const load = async() => {
      const chatsPromise = authorizedUser.chats({offset: 0, count: -1})
      const chatsIdsPromise = authorizedUser.chatIds();
      (await chatsIdsPromise).forEach(async id => {
        const hook = await chatWebsockets.get(id, token)
        hook.onMessageAdded(receiveMessage)
      })
      dispatch(addChats(await chatsPromise))
    }

    load()
  }, [])
  useEffect(() => {
    const load = async () => {
      const webhook = await chatWebsockets.get(selectedChat.id, token)
      setChatWebsocket(webhook)
    }
    
    if (selectedChat !== nullChat) {
      load()
    }
  }, [selectedChat])
  useEffect(() => {
    setAuthorizedUser(new AuthorizedUserApi(token))
  }, [token])

  const receiveMessage = async (message: Message) => {
    const chats = chatsRef.current;
    if (!chats.some(c => c.id === message.chatId)) {
      const chat = await authorizedUser.chat(message.chatId)
      dispatch(unshiftChat(chat))
    }
    
    dispatch(setLastMessage({chatId: message.chatId, message}))
    dispatch(addMessage({chatId: message.chatId, message}))
  }
  const searchInChat = useCallback(() => {
    setSearch({type: "messages", inChat: selectedChat})
  }, [selectedChat])

  return (
    <div className="index">
      {search.type === "chats" && <ChatsBlock
        selectedChat={selectedChat}
        onChatSelected={setSelectedChat}
        chats={chats}
        websockets={chatWebsockets}
      />}
      {search.type === "messages" && <MessagesSearch
        chat={search.inChat}
        onCloseClick={() => setSearch({type: "chats"})}
        onMessageSelect={() => {}}
      />}
      {
        selectedChat === nullChat? 
          <></>:
          <Chat
            chat={selectedChat}
            websocket={chatWebsocket}
            onMessageSearchClick={searchInChat}
          />
      }
    </div>
  )
}