import React, {FC, ReactElement, useContext, useState} from "react";
import {UpLayerContext} from "../contexts/UpLayerContext";
import {LeftMenuContext} from "../contexts/LeftMenuContext";
import {UpLayer} from "../components/up-layer/UpLayer";
import {LeftMenu} from "../components/menus/left-menu";
import {useArray} from "../hooks/useArray";
import {useFlag} from "../hooks/useFlag";
import {ModalsContext} from "../components/up-layer/Modals";
import {empty} from "../utils/array/empty";
import {useFunction} from "../hooks/useFunction";

export const UpLayerProvider: FC = ({children}) => {
  const [leftMenuVisible, showLeftMenu, hideLeftMenu] = useFlag(false)
  const [arbitraryElements, setArbitraryElements] = useState<Record<string, ReactElement | undefined>>({})
  const modalsContext = useContext(ModalsContext)

  const hide = useFunction(() => {
    hideLeftMenu()
  })

  const insertArbitraryElement = useFunction((element: ReactElement | undefined, key: string) => {
    setArbitraryElements(state => ({...state, [key]: element}))
  })
  const hideArbitraryElement = useFunction((key: string) => {
    setArbitraryElements(state => ({...state, [key]: undefined}))
  })
  const onClick = useFunction(() => {
    hideLeftMenu()
  })
  
  return (
    <UpLayerContext.Provider value={{hide, insertArbitraryElement, hideArbitraryElement}}>
      <LeftMenuContext.Provider value={{show: showLeftMenu, hide: hideLeftMenu}}>
        <UpLayer
          leftElementVisible={leftMenuVisible}
          leftElement={<LeftMenu onItemClick={hideLeftMenu} visible={leftMenuVisible}/>}
          arbitraryElements={Object.values(arbitraryElements)}
          onClick={onClick}
          modalOpened={!empty(modalsContext.items)}
        >
          {children}
        </UpLayer>
      </LeftMenuContext.Provider>
    </UpLayerContext.Provider>
  )
}