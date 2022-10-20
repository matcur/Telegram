import React, {createContext, createRef, FC, ReactNode, useState} from "react";
import {useOutsideClick} from "../hooks/useOutsideClick";
import {nope, Nothing} from "../utils/functions";
import {lastIn} from "../utils/lastIn";
import "styles/modal.sass"
import "styles/up-layer.sass"
import {useFunction} from "../hooks/useFunction";

type Props = {}

export const ModalsContext = createContext({
  insert(element: ReactNode, name: string, hide: Nothing) {},
  remove(key: string) {},
  items: [] as Modal[],
})

type Modal = {name: string, element: ReactNode, hide: Nothing}

const nullModal: Modal = {hide: nope, element: "", name: ""}

export const Modals: FC<Props> = ({children}) => {
  const [modals, setModals] = useState<Modal[]>([])
  const upperModalRef = createRef<HTMLDivElement>()

  const removeUpper = useFunction(() => {
    const length = modals.length
    if (!length) {
      return []
    }

    const newModals = [...modals]
    lastIn(newModals, nullModal).hide()
    
    newModals.splice(length - 1, 1)
    setModals(newModals)
  })
  const insert = useFunction((element: ReactNode, name: string, hide) => {
    setModals(modals => {
      const newModals = [...modals]
      const index = newModals.findIndex(m => m.name === name)
      if (index !== -1) {
        newModals[index].element = element
      } else {
        newModals.push({name, element, hide})
      }
      
      return newModals
    })
  })
  const remove = useFunction((name: string) => {
    setModals(modals => {
      const newModals = [...modals]
      const index = newModals.findIndex(m => m.name === name)
      if (index !== -1) {
        newModals.splice(index, 1)
      }
      
      return newModals
    })
  })

  useOutsideClick(removeUpper, upperModalRef, modals)
  
  return (
    <ModalsContext.Provider
      value={{insert, remove, items: modals}}
    >
      {children}
      {modals.map((m, i) => (
        <div
          ref={upperModalRef}
          className="modal"
          style={{zIndex: i === modals.length - 1 ? 101 : 0}}
        >{m.element}</div>
      ))}
    </ModalsContext.Provider>
  )
}