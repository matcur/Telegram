import {FC, useContext, useEffect} from "react";
import {ModalsContext} from "./Modals";

type Props = {
  name: string
}

export const Modal: FC<Props> = ({children, name}) => {
  const modalsContext = useContext(ModalsContext)
  
  useEffect(() => {
    modalsContext.insert(<div className="modal">{children}</div>, name)
  }, [children])
  useEffect(() => {
    return () => modalsContext.remove(name)
  }, [])
  
  return null
}