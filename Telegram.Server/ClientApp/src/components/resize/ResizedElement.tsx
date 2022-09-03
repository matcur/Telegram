import React, {FC, useCallback, useContext, useEffect, useRef} from "react";
import {ResizesContext} from "./ResizeContext";
import {useRandomString} from "../../hooks/useRandomString";
import {withoutUnit} from "../../utils/withoutUnit";

type Props = {
  initWidth?: "*" | number
  maxWidth?: number
  minWidth?: number
}

export const ResizedElement: FC<Props> = ({
  maxWidth = Number.POSITIVE_INFINITY,
  minWidth = Number.NEGATIVE_INFINITY,
  initWidth = "*",
  children,
}) => {
  const resizedRef = useRef<HTMLDivElement>(null)
  const resizeContext = useContext(ResizesContext)
  const key = "resized_" + useRandomString()

  const increaseWidthInternal = useCallback((width: number) => {
    const resize = resizedRef.current
    if (!resize) {
      return
    }
    const styles = resize.style
    const newWidth = withoutUnit(styles.width) + width
    if (newWidth > maxWidth || newWidth < minWidth) {
      return
    }

    styles.width = `${newWidth}px`
  }, [])

  useEffect(function subscribeToResize() {
    resizeContext.insert(key, {
      increaseWidth(width: number) {
        increaseWidthInternal(width)
      },
      decreaseWidth(width: number) {
        increaseWidthInternal(-width)
      },
      minWidth() {
        return minWidth
      },
      width(): number {
        return withoutUnit(resizedRef?.current?.style?.width)
      }
    })

    return () => resizeContext.remove(key)
  }, [])

  useEffect(function initWidthEffect() {
    const resize = resizedRef.current
    if (!resize) {
      return
    }
    if (initWidth === "*") {
      resize.style.flexGrow = "100"
    } else {
      resize.style.width = `${initWidth}px`
    }
  }, [resizedRef.current])

  return (
    <div ref={resizedRef}>
      {children}
    </div>
  )
}