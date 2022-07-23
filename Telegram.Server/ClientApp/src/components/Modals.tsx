import {createContext, createRef, FC, ReactNode, useCallback, useState} from "react";
import {classNames} from "../utils/classNames";
import {useOutsideClick} from "../hooks/useOutsideClick";
import {nope, Nothing} from "../utils/functions";
import {lastIn} from "../utils/lastIn";

type Props = {}

export const ModalsContext = createContext({
  insert(element: ReactNode, name: string, hide: Nothing) {},
  remove(key: string) {},
})

type Modal = {name: string, element: ReactNode, hide: Nothing}

const nullModal: Modal = {hide: nope, element: "", name: ""}

export const Modals: FC<Props> = ({children}) => {
  const [modals, setModals] = useState<Modal[]>([])
  const upperModalRef = createRef<HTMLDivElement>()

  const removeUpper = useCallback(() => {
    const length = modals.length
    if (!length) {
      return []
    }

    const newModals = [...modals]
    lastIn(newModals, nullModal).hide()
    
    newModals.splice(length - 1, 1)
    setModals(newModals)
  }, [modals])
  const insert = useCallback((element: ReactNode, name: string, hide) => {
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
  }, [])
  const remove = useCallback((name: string) => {
    setModals(modals => {
      const newModals = [...modals]
      const index = newModals.findIndex(m => m.name === name)
      if (index !== -1) {
        newModals.splice(index, 1)
      }
      
      return newModals
    })
  }, [])

  useOutsideClick(removeUpper, upperModalRef, modals)
  
  return (
    <ModalsContext.Provider
      value={{insert, remove}}
    >
      {children}
      <div className={classNames("modals up-layer", Object.keys(modals).length && "opened-modals")}>
        {modals.map((m, i) => <div ref={upperModalRef} className="modal">{m.element}</div>)}
      </div>
    </ModalsContext.Provider>
  )
}