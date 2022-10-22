import React, {FC, ReactElement, useContext} from "react";
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
  const arbitraryElements = useArray<ReactElement>()
  const modalsContext = useContext(ModalsContext)

  const hide = useFunction(() => {
    hideLeftMenu()
  })

  const addArbitraryElement = useFunction((element: ReactElement) => {
    arbitraryElements.add(element)

    return () => arbitraryElements.remove(element)
  })
  const onClick = useFunction(() => {
    hideLeftMenu()
  })
  
  return (
    <UpLayerContext.Provider value={{hide, addArbitraryElement}}>
      <LeftMenuContext.Provider value={{show: showLeftMenu, hide: hideLeftMenu}}>
        <UpLayer
          leftElementVisible={leftMenuVisible}
          leftElement={<LeftMenu onItemClick={hideLeftMenu} visible={leftMenuVisible}/>}
          arbitraryElements={arbitraryElements.value}
          onClick={onClick}
          modalOpened={!empty(modalsContext.items)}
        >
          {children}
        </UpLayer>
      </LeftMenuContext.Provider>
    </UpLayerContext.Provider>
  )
}