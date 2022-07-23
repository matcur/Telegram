import {FC, useContext, useEffect} from "react";
import {ModalsContext} from "./Modals";
import {Nothing} from "../utils/functions";

type Props = {
  name: string
  hide: Nothing
}

export const Modal: FC<Props> = ({children, name, hide}) => {
  const modalsContext = useContext(ModalsContext)
  
  useEffect(() => {
    modalsContext.insert(children, name, hide)
  }, [children])
  useEffect(() => {
    return () => {
      modalsContext.remove(name)
      hide()
    }
  }, [])
  
  return null
}