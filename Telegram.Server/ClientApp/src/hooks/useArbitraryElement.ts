import {ReactElement, useContext, useState} from "react";
import {UpLayerContext} from "../contexts/UpLayerContext";
import {RemoveLastCentralElement} from "../utils/functions";
import {Position} from "../utils/type";

class ArbitraryPosition {
  constructor() {
    this.hide = this.hide.bind(this)
  }

  show(element: ReactElement) {}
  hide() {this.internalHide()}
  internalHide() {}
}

export const useArbitraryElement = () => {
  const upLayer = useContext(UpLayerContext)
  const [element] = useState(() => new ArbitraryPosition())
  const [hide, setHide] = useState<RemoveLastCentralElement>(() => () => {})

  element.show = (element: ReactElement) => {
    setHide(() => upLayer.addArbitraryElement(element))
  }
  element.internalHide = hide

  return element;
}