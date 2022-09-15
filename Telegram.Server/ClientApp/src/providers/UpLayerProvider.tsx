import React, {FC, ReactElement, useCallback, useContext} from "react";
import {UpLayerContext} from "../contexts/UpLayerContext";
import {LeftMenuContext} from "../contexts/LeftMenuContext";
import {UpLayer} from "../components/up-layer/UpLayer";
import {LeftMenu} from "../components/menus/left-menu";
import {useArray} from "../hooks/useArray";
import {useFlag} from "../hooks/useFlag";
import {ModalsOpened} from "../components/Modals";

export const UpLayerProvider: FC = ({children}) => {
  const [leftMenuVisible, showLeftMenu, hideLeftMenu] = useFlag(false)
  const arbitraryElements = useArray<ReactElement>()
  const modalsContext = useContext(ModalsOpened)

  const hide = useCallback(() => {
    hideLeftMenu()
  }, [])

  const addArbitraryElement = useCallback((element: ReactElement) => {
    arbitraryElements.add(element)

    return () => arbitraryElements.remove(element)
  }, [])
  const onClick = useCallback(() => {
    hideLeftMenu()
  }, [])
  
  return (
    <UpLayerContext.Provider value={{hide, addArbitraryElement}}>
      <LeftMenuContext.Provider value={{show: showLeftMenu, hide: hideLeftMenu}}>
        <UpLayer
          leftElementVisible={leftMenuVisible}
          leftElement={<LeftMenu onItemClick={hideLeftMenu} visible={leftMenuVisible}/>}
          arbitraryElements={arbitraryElements.value}
          onClick={onClick}
          modalOpened={modalsContext}
        >
          {children}
        </UpLayer>
      </LeftMenuContext.Provider>
    </UpLayerContext.Provider>
  )
}