import React, {FC, ReactElement, useCallback, useState} from "react";
import {UpLayerContext} from "../contexts/UpLayerContext";
import {LeftMenuContext} from "../contexts/LeftMenuContext";
import {UpLayer} from "../components/up-layer/UpLayer";
import {LeftMenu} from "../components/menus/left-menu";
import {RemoveLastCentralElement} from "../utils/functions";
import {useArray} from "../hooks/useArray";
import {useFlag} from "../hooks/useFlag";

export const UpLayerProvider: FC = ({children}) => {
  const [leftMenuVisible, showLeftMenu, hideLeftMenu] = useFlag(false)
  const [centralElements, setCentralElements] = useState<ReactElement[]>(() => [])
  const arbitraryElements = useArray<ReactElement>()

  const hideUpLayer = useCallback(() => {
    hideLeftMenu()
    setCentralElements([])
  }, [])

  const addCentralElement = useCallback((element: ReactElement) => {
    setCentralElements([...centralElements, element])
    hideLeftMenu()

    return (() => {
      setCentralElements(elements => {
        const result = [...elements];
        const elementIndex = elements.indexOf(element)

        if (elementIndex >= 0) {
          result.splice(elementIndex, 1)
        }

        return result;
      })
    }) as RemoveLastCentralElement
  }, [centralElements])
  const addArbitraryElement = useCallback((element: ReactElement) => {
    arbitraryElements.add(element)

    return () => arbitraryElements.remove(element)
  }, [])
  const removeLastCentralElement = useCallback(() => {
    setCentralElements(elements => {
      const result = [...elements]
      result.splice(result.length - 1, 1)

      return result
    })
  }, [])
  const onClick = useCallback(() => {
    removeLastCentralElement()
    hideLeftMenu()
  }, [removeLastCentralElement])
  
  return (
    <UpLayerContext.Provider value={{addCentralElement, hide: hideUpLayer, addArbitraryElement}}>
      <LeftMenuContext.Provider value={{show: showLeftMenu, hide: hideLeftMenu}}>
        <UpLayer
          leftElementVisible={leftMenuVisible}
          leftElement={<LeftMenu onItemClick={hideLeftMenu} visible={leftMenuVisible}/>}
          arbitraryElements={arbitraryElements.value}
          centerElements={centralElements}
          onClick={onClick}>
          {children}
        </UpLayer>
      </LeftMenuContext.Provider>
    </UpLayerContext.Provider>
  )
}