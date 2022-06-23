import React, {useEffect, useState} from 'react'
import {LeftMenu} from "components/menus/left-menu";
import {ChatsBlock} from "components/chat/ChatsBlock";
import {Chat} from "components/chat/Chat";
import {nullChat, nullChatWebsocket} from "nullables";
import {UpLayerContext} from "contexts/UpLayerContext";
import { LeftMenuContext } from 'contexts/LeftMenuContext';
import {useArray} from "../hooks/useArray";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {useAppSelector} from "../app/hooks";
import {Message} from "../models";
import {addChats, addMessage, setLastMessage} from "../app/slices/authorizationSlice";
import {useDispatch} from "react-redux";
import {host} from "../api/ApiClient";
import {ChatWebsockets} from "../app/chat/ChatWebsockets";
import {AuthorizedUserApi} from "../api/AuthorizedUserApi";
import {ChatWebsocket} from "../app/chat/ChatWebsocket";
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
  const chats = currentUser.chats
  const token = useAppSelector(state => state.authorization.token)
  const [chatWebsockets] = useState(() => new ChatWebsockets())
  const [chatWebsocket, setChatWebsocket] = useState<ChatWebsocket>(() => nullChatWebsocket)
  const [search, setSearch] = useState<Search>(() => ({type: "chats"}))
  const dispatch = useDispatch()

  useEffect(() => {
    const load = async() => {
      const chats = await new AuthorizedUserApi(token).chats()
      dispatch(addChats(chats))
      chats.forEach(async c => {
        const hook = await chatWebsockets.get(c.id, token)
        hook.onMessageAdded(receiveMessage)
      })
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

  const receiveMessage = (message: Message) => {
    dispatch(setLastMessage({chatId: message.chatId, message}))
    dispatch(addMessage({chatId: message.chatId, message}))
  }
  const searchInChat = (chat: ChatModel) => {
    setSearch({type: "messages", inChat: chat})
  }

  return (
    <div className="index">
      {search.type === "chats" && <ChatsBlock
        selectedChat={selectedChat}
        onChatSelected={setSelectedChat}
        chats={chats}
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
            onMessageSearchClick={() => searchInChat(selectedChat)}
          />
      }
    </div>
  )
}