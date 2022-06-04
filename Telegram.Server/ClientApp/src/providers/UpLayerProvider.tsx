import React, {FC, ReactElement, useState} from "react";
import {UpLayerContext} from "../contexts/UpLayerContext";
import {LeftMenuContext} from "../contexts/LeftMenuContext";
import {UpLayer} from "../components/up-layer/UpLayer";
import {LeftMenu} from "../components/menus/left-menu";
import {RemoveLastCentralElement} from "../utils/functions";
import {useArray} from "../hooks/useArray";

export const UpLayerProvider: FC = ({children}) => {
  const [leftMenuVisible, setLeftMenuVisible] = useState(false)
  const [centralElements, setCentralElements] = useState<ReactElement[]>(() => [])
  const arbitraryElements = useArray<ReactElement>()

  const hideUpLayer = () => {
    setLeftMenuVisible(false)
    setCentralElements([])
  }

  const addCentralElement = (element: ReactElement) => {
    setCentralElements([...centralElements, element])
    setLeftMenuVisible(false)

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
  }
  const addArbitraryElement = (element: ReactElement) => {
    arbitraryElements.add(element)
    
    return () => arbitraryElements.remove(element)
  }
  const removeLastCentralElement = () => {
    setCentralElements(elements => {
      const result = [...elements]
      result.splice(result.length - 1, 1)

      return result
    })
  }
  const onClick = () => {
    removeLastCentralElement()
    setLeftMenuVisible(false)
  }
  
  return (
    <UpLayerContext.Provider value={{addCentralElement, hide: hideUpLayer, addArbitraryElement}}>
      <LeftMenuContext.Provider value={{setVisible: setLeftMenuVisible}}>
        <UpLayer
          leftElementVisible={leftMenuVisible}
          leftElement={<LeftMenu visible={leftMenuVisible}/>}
          arbitraryElements={arbitraryElements.value}
          centerElements={centralElements}
          onClick={onClick}>
          {children}
        </UpLayer>
      </LeftMenuContext.Provider>
    </UpLayerContext.Provider>
  )
}