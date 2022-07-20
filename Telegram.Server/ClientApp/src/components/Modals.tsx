import {createContext, FC, ReactNode, useCallback, useState} from "react";
import {classNames} from "../utils/classNames";

type Props = {}

export const ModalsContext = createContext({
  insert(element: ReactNode, key: string) {},
  remove(key: string) {},
})

export const Modals: FC<Props> = ({children}) => {
  const [modals, setModals] = useState<Record<string, ReactNode | undefined>>({})

  const insert = (element: ReactNode, key: string) => {
    setModals(modals => ({
      ...modals,
      [key]: element,
    }))
  }
  const remove = useCallback((key: string) => {
    setModals(modals => {
      const newModals = {...modals}
      
      delete newModals[key]
      
      return newModals
    })
  }, [])
  
  return (
    <ModalsContext.Provider
      value={{insert, remove}}
    >
      {children}
      <div className={classNames("modals", Object.keys(modals).length && "opened-modals")}>
        {Object.values(modals)}
      </div>
    </ModalsContext.Provider>
  )
}