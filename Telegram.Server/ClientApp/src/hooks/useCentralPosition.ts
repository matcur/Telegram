import {ReactElement, useContext, useState} from "react";
import {UpLayerContext} from "../contexts/UpLayerContext";
import {RemoveLastCentralElement} from "../utils/functions";

class CentralPosition {
  constructor() {
    this.hide = this.hide.bind(this)
  }
  
  show(element: ReactElement) {}
  hide() {this.internalHide()}
  internalHide() {}
}

// use inside Modal
export const useCentralPosition: () => ({show: (element: ReactElement) => void, hide: () => void}) = () => {
  const upLayer = useContext(UpLayerContext)
  const [centralPosition] = useState(() => new CentralPosition())
  const [hide, setHide] = useState<RemoveLastCentralElement>(() => () => {})
  
  centralPosition.show = (element: ReactElement) => {
    setHide(() => upLayer.addCentralElement(element))
  }
  centralPosition.internalHide = hide
  
  return centralPosition;
} 