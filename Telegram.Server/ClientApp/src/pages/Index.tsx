import React, {useEffect, useState} from 'react'
import {UpLayer} from "components/UpLayer";
import {LeftMenu} from "components/menus/left-menu";
import {ChatsBlock} from "components/chat/ChatsBlock";
import {Chat} from "components/chat/Chat";
import {nullChat, nullChatWebhook} from "nullables";
import {UpLayerContext} from "contexts/UpLayerContext";
import { LeftMenuContext } from 'contexts/LeftMenuContext';
import {useArray} from "../hooks/useArray";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {useAppSelector} from "../app/hooks";
import {Message} from "../models";
import {addChats, addMessage, setLastMessage} from "../app/slices/authorizationSlice";
import {useDispatch} from "react-redux";
import {host} from "../api/ApiClient";
import {ChatWebhooks} from "../app/chat/ChatWebhooks";
import {AuthorizedUserApi} from "../api/AuthorizedUserApi";
import {ChatWebhook} from "../app/chat/ChatWebhook";

export const Index = () => {
  const [selectedChat, setSelectedChat] = useState(nullChat)
  const [upLayerVisible, setUpLayerVisible] = useState(false)
  const [leftMenuVisible, setLeftMenuVisible] = useState(false)
  const [centralElement, setCentralElement] = useState(() => <div/>)
  const currentUser = useAppSelector(state => state.authorization.currentUser)
  const chats = currentUser.chats
  const token = useAppSelector(state => state.authorization.token)
  const [chatWebhooks] = useState(() => new ChatWebhooks())
  const [chatWebhook, setChatWebhook] = useState<ChatWebhook>(() => nullChatWebhook)
  const dispatch = useDispatch()

  useEffect(() => {
    const load = async() => {
      const response = await new AuthorizedUserApi(token).chats()
      dispatch(addChats(response.result))
      response.result.forEach(async c => {
        const hook = await chatWebhooks.get(c.id)
        hook.onMessageAdded(receiveMessage)
      })
    }

    load()
  }, [])
  
  useEffect(() => {
    const load = async () => {
      const webhook = await chatWebhooks.get(selectedChat.id)
      setChatWebhook(webhook)
    }
    
    load()
  }, [selectedChat])

  const receiveMessage = (message: Message) => {
    dispatch(setLastMessage({chatId: message.chatId, message}))
    debugger
    if (message.author.id !== currentUser.id) {
      dispatch(addMessage({chatId: message.chatId, message}))
    }
  }
  const emitMessage = async (message: Message) => {
    const webhook = await chatWebhooks.get(message.chatId)
    webhook.emitMessage(message)
  }
  
  const hideUpLayer = () => {
    setLeftMenuVisible(false)
    setUpLayerVisible(false)
    setCentralElement(<div/>)
  }

  return (
    <UpLayerContext.Provider value={{setVisible: setUpLayerVisible, setCentralElement, hide: hideUpLayer}}>
      <LeftMenuContext.Provider value={{setVisible: setLeftMenuVisible}}>
        <div className="index">
          <UpLayer
            visible={upLayerVisible}
            leftElement={<LeftMenu visible={leftMenuVisible}/>}
            centerElement={centralElement}
            onClick={hideUpLayer}/>
          <ChatsBlock
            selectedChat={selectedChat}
            onChatSelected={setSelectedChat}
            chats={chats}/>
          {
            selectedChat === nullChat? 
              <></>:
              <Chat
                chat={selectedChat}
                emitMessage={emitMessage}
                webhook={chatWebhook}/>
          }
        </div>
      </LeftMenuContext.Provider>
    </UpLayerContext.Provider>
  )
}