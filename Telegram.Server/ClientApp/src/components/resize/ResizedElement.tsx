import React, {CSSProperties, FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {ResizesContext} from "./ResizeContext";
import {useRandomString} from "../../hooks/useRandomString";
import {withoutUnit} from "../../utils/withoutUnit";

type Props = {
  initWidth?: "*" | number
  maxWidth?: number
  minWidth?: number
}

const remainWidth: CSSProperties = {flexGrow: 100}

export const ResizedElement: FC<Props> = ({
  maxWidth = Number.POSITIVE_INFINITY,
  minWidth = Number.NEGATIVE_INFINITY,
  initWidth = "*",
  children,
}) => {
  const [styles, setStyles] = useState<CSSProperties>(() => ({}))
  const stylesRef = useRef(styles)
  stylesRef.current = styles
  const resizeContext = useContext(ResizesContext)
  const key = "resized_" + useRandomString()

  const increaseWidthInternal = useCallback((width: number) => {
    setStyles(styles => {
      const newWidth = withoutUnit(styles.width) + width
      if (newWidth > maxWidth || newWidth < minWidth) {
        return styles
      }

      return {
        ...styles,
        width: newWidth
      }
    })
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
        return withoutUnit(stylesRef.current.width)
      }
    })

    return () => resizeContext.remove(key)
  }, [])

  useEffect(function initWidthEffect() {
    if (initWidth === "*") {
      setStyles(styles => ({...styles, ...remainWidth}))
    } else {
      setStyles(styles => ({...styles, width: initWidth}))
    }
  }, [])

  return (
    <div style={styles}>
      {children}
    </div>
  )
}