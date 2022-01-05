import React, {useState} from 'react'
import {UpLayer} from "components/UpLayer";
import {LeftMenu} from "components/menus/left-menu";
import {ChatsBlock} from "components/chat/ChatsBlock";
import {Chat} from "components/chat/Chat";
import {nullChat} from "nullables";
import {UpLayerContext} from "contexts/UpLayerContext";
import { LeftMenuContext } from 'contexts/LeftMenuContext';

export const Index = () => {
  const [selectedChat, setSelectedChat] = useState(nullChat)
  const [upLayerVisible, setUpLayerVisible] = useState(false)
  const [leftMenuVisible, setLeftMenuVisible] = useState(false)
  const [centralElement, setCentralElement] = useState(<div/>)

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
            onChatSelected={setSelectedChat}/>
          {
            selectedChat === nullChat? <></>: <Chat chat={selectedChat}/>
          }
        </div>
      </LeftMenuContext.Provider>
    </UpLayerContext.Provider>
  )
}