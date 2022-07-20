import {FC, useContext, useEffect} from "react";
import {ModalsContext} from "./Modals";

type Props = {
  key: string
}

export const Modal: FC<Props> = ({children, key}) => {
  const modalsContext = useContext(ModalsContext)
  
  useEffect(() => {
    modalsContext.insert(children, key)
  }, [children])
  useEffect(() => {
    return () => modalsContext.remove(key)
  }, [])
  
  return null
}