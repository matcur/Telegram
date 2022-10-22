import {FC, ReactElement, useContext, useEffect, useRef} from "react";
import {ModalsContext} from "./Modals";
import {Nothing} from "../../utils/functions";
import {circularReplacer} from "../../utils/circularReplacer";

type Props = {
  name: string
  hide: Nothing
  children: ReactElement<any>
}

export const Modal = ({children, name, hide}: Props) => {
  const modalsContext = useContext(ModalsContext)
  
  useEffect(() => {
    modalsContext.insert(children, name, hide)
  }, [JSON.stringify(children.props, circularReplacer())])
  useEffect(() => {
    return () => {
      modalsContext.remove(name)
      hide()
    }
  }, [])
  
  return null
}