import React, {FC, ReactElement, useState} from "react";
import {UpLayerContext} from "../contexts/UpLayerContext";
import {LeftMenuContext} from "../contexts/LeftMenuContext";
import {UpLayer} from "../components/UpLayer";
import {LeftMenu} from "../components/menus/left-menu";
import {RemoveLastCentralElement} from "../utils/functions";

export const UpLayerProvider: FC = ({children}) => {
  const [leftMenuVisible, setLeftMenuVisible] = useState(false)
  const [centralElements, setCentralElements] = useState<ReactElement[]>(() => [])

  const hideUpLayer = () => {
    setLeftMenuVisible(false)
    setCentralElements([])
  }

  const addCentralElement = (newElement: ReactElement) => {
    setCentralElements([...centralElements, newElement])
    setLeftMenuVisible(false)

    return (() => {
      setCentralElements(elements => {
        const result = [...elements];
        const elementIndex = elements.indexOf(newElement)

        if (elementIndex >= 0) {
          result.splice(elementIndex, 1)
        }

        return result;
      })
    }) as RemoveLastCentralElement
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
    <UpLayerContext.Provider value={{addCentralElement, hide: hideUpLayer}}>
      <LeftMenuContext.Provider value={{setVisible: setLeftMenuVisible}}>
        <UpLayer
          leftElementVisible={leftMenuVisible}
          leftElement={<LeftMenu visible={leftMenuVisible}/>}
          centerElements={centralElements}
          onClick={onClick}/>
        {children}
      </LeftMenuContext.Provider>
    </UpLayerContext.Provider>
  )
}