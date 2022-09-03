import React, {CSSProperties, useCallback, useContext, useEffect, useRef} from "react";
import {ParentResizeContext, ResizeBarsContext} from "./ResizeContext";
import {useRandomString} from "../../hooks/useRandomString";
import {useWindowListener} from "../../hooks/useWindowListener";

type Props = {
  style?: Omit<CSSProperties, 'width'>
  width?: number
}

export const ResizeBar = ({style, width = 3}: Props) => {
  const handlerWidth = width + 4
  const resizeBarsContext = useContext(ResizeBarsContext)
  const parentResizeContext = useContext(ParentResizeContext)
  const key = "resize_bar_" + useRandomString()
  const mouseStateRef = useRef({downed: false, lastDownXPosition: 0})
  const activateResize = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    parentResizeContext.disableUserSelect()
    mouseStateRef.current.downed = true
    mouseStateRef.current.lastDownXPosition = e.clientX
  }, [])
  const disableResize = useCallback(() => {
    parentResizeContext.activateUserSelect()
    mouseStateRef.current.downed = false
  }, [])
  const resizeRef = useRef<HTMLDivElement>(null)
  const onMouseMove = useCallback((e: MouseEvent) => {
    const mouseState = mouseStateRef.current
    const resize = resizeRef.current
    if (!mouseState.downed || !resize) {
      return
    }

    const mouseXPosition = e.clientX
    const moveLeft = mouseState.lastDownXPosition - mouseXPosition
    mouseState.lastDownXPosition = mouseXPosition
    if (
      moveLeft < 0 &&
      mouseXPosition < resize.getBoundingClientRect().left
    ) {
      return
    }
    if (
      moveLeft > 0 &&
      mouseXPosition > resize.getBoundingClientRect().right
    ) {
      return
    }

    resizeBarsContext.moveLeft(key, moveLeft)
    mouseState.lastDownXPosition = mouseXPosition
  }, [resizeBarsContext.moveLeft])

  useWindowListener(onMouseMove, "mousemove")
  useWindowListener(disableResize, "mouseup")

  useEffect(() => {
    resizeBarsContext.insert(key)

    return () => resizeBarsContext.remove(key)
  }, [])

  return (
    <div
      ref={resizeRef}
      className="resize-bar"
      style={{
        width,
        ...style
      }}
    >
      <div
        className="resize-bar-handler"
        style={{width: handlerWidth}}
        onMouseDown={activateResize}
      />
    </div>
  )
}