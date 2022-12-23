import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import {Position} from "../../utils/type";
import {useOutsideClick} from "../../hooks/useOutsideClick";
import {circularReplacer} from "../../utils/circularReplacer";
import {UpLayerContext} from "../../contexts/UpLayerContext";
import {useRandomString} from "../../hooks/useRandomString";
import {delay} from "../../utils/delay";
import {classNames} from "../../utils/classNames";

type Props = {
  position?: Position | {left: number, bottom: number}
  children: ReactElement
  closingDuration?: number
  closingClass?: string
  visible: boolean
  hide(): void
}

export const ArbitraryElement = ({children, position, closingDuration = 200, hide, closingClass = "closing-arbitrary-element", visible}: Props) => {
  const [offset, setOffset] = useState(() => ({top: 0, left: 0}))
  const [contentSize, setContentSize] = useState(() => ({width: 0, height: 0}))
  const upLayer = useContext(UpLayerContext)
  const key = useRandomString()
  const [animation, setAnimation] = useState<"closed" | "opened" | "closing">("closed")
  const ref = useRef<HTMLDivElement>(null)
  
  useOutsideClick(async () => {
    const element = ref.current
    if (!element || !visible) {
      return
    }
    closingClass && element.classList.add(closingClass)
    await delay(closingDuration)
    closingClass && element.classList.remove(closingClass)
    hide()
    setAnimation("closed")
  }, ref)
  
  useEffect(() => {
    if (visible) {
      setAnimation("opened")
    } else {
      setAnimation("closing")
    }
  }, [visible])
  
  useEffect(function calculateOffset() {
    if (!position) {
      return
    }
    const width = document.body.clientWidth
    const height = document.body.clientHeight
    
    const result = {top: 0, left: 0}
    if (width <= (position.left + contentSize.width)) {
      result.left = -contentSize.width
    }
    
    if ("top" in position && height <= (position.top + contentSize.height)) {
      result.top = -contentSize.height
    }
    
    setOffset(result)
  }, [contentSize.height, contentSize.width])
  
  useEffect(function onSizeChange() {
    const current = ref && ref.current
    if (!current) return
    
    setContentSize({width: current.clientWidth, height: current.clientHeight})
  }, [offset])

  useEffect(() => {
    if (!position || animation === "closing") {
      return upLayer.insertArbitraryElement(undefined, key)
    }
    let indent: Position | {left: number, bottom: number}
    if ("bottom" in position) {
      indent = {
        bottom: position.bottom,
        left: position.left + offset.left,
      }
    } else {
      indent = {
        top: position.top + offset.top,
        left: position.left + offset.left,
      }
    }
    upLayer.insertArbitraryElement(
      <div
        ref={ref}
        className={classNames(
          "arbitrary-element",
          animation === "opened" && "opened-arbitrary",
          animation !== "opened" && "closing-arbitrary"
        )}
        style={{...indent, transition: `${closingDuration}ms`}}
      >
        {children}
      </div>,
      key
    )
  }, [JSON.stringify(children.props, circularReplacer()), animation])
  
  useEffect(() => {
    return () => {
      upLayer.hideArbitraryElement(key)
    }
  }, [])

  useOutsideClick(hide, ref)
  
  return null
}