import React, {useEffect, useState} from 'react'
import {ChatsBlock} from "components/chat/ChatsBlock";
import {ChatOfType} from "components/chat/ChatOfType";
import {nullChat} from "nullables";
import {useAppSelector} from "../app/hooks";
import {
  addChats,
} from "../app/slices/authorizationSlice";
import {useDispatch} from "react-redux";
import {AuthorizedUserApi} from "../api/AuthorizedUserApi";
import {Chat as ChatModel, User} from "models";
import {MessagesSearch} from "../components/search/MessageSearch/MessagesSearch";
import "styles/pages/chat.sass"
import {Resize} from "../components/resize/Resize";
import {ResizedElement} from "../components/resize/ResizedElement";
import {ResizeBar} from "../components/resize/ResizeBar";
import {useReceiveMessage} from "../hooks/useReseiveMessage";
import {useChatWebsocket} from "../hooks/useChatWebsocket";
import {initChatWebsocket, onMessageAdded, onMessageTyping} from "../app/websockets/chatWebsocket";
import {useFunction} from "../hooks/useFunction";

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
  const chats = currentUser.chats
  const token = useAppSelector(state => state.authorization.token)
  const [search, setSearch] = useState<Search>(() => ({type: "chats"}))
  const [authorizedUser, setAuthorizedUser] = useState(() => new AuthorizedUserApi(token))
  const dispatch = useDispatch()
  const receiveMessage = useReceiveMessage()
  const subscribe = useChatWebsocket()
  const searchInChat = useFunction(() => {
    setSearch({type: "messages", inChat: selectedChat})
  })

  useEffect(() => {
    const load = () => {
      const chatsPromise = authorizedUser.chats({offset: 0, count: -1})
      const chatIdsPromise = authorizedUser.chatIds();
      chatIdsPromise.then(ids =>{
        ids.forEach(id => {
          initChatWebsocket(id, token)
          onMessageAdded(id, receiveMessage)
        })
      })
      chatsPromise.then(chats => {
        dispatch(addChats(chats))
        chats.forEach(c => subscribe(c.id))
      })
    }

    load()
  }, [])
  useEffect(() => {
    chats.forEach(chat => {
      const chatId = chat.id;
      subscribe(chatId)
      onMessageAdded(chatId, receiveMessage)
    })
  }, [chats.length, token])
  useEffect(() => {
    setAuthorizedUser(new AuthorizedUserApi(token))
  }, [token])

  return (
    <div className="index">
      <Resize>
        <ResizedElement initWidth={400} maxWidth={800} minWidth={400}>
          {search.type === "chats" && (
            <ChatsBlock
              selectedChat={selectedChat}
              onChatSelected={setSelectedChat}
              chats={chats}
            />
          )}
          {search.type === "messages" && (
            <MessagesSearch
              chat={search.inChat}
              onCloseClick={() => setSearch({type: "chats"})}
              onMessageSelect={() => {}}
            />
          )}
        </ResizedElement>
        <ResizeBar width={0}/>
        {
          selectedChat === nullChat?
            <div className="chat"/>: (
              <ResizedElement>
                <ChatOfType
                  chat={selectedChat}
                  onMessageSearchClick={searchInChat}
                />
              </ResizedElement>
            )
        }
      </Resize>
    </div>
  )
}