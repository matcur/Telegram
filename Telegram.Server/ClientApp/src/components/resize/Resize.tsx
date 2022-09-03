﻿import React, {CSSProperties, FC, useCallback, useState} from "react";
import {ParentResizeContext, ResizeBarsContext, Resizes, ResizesContext, ResizeValue} from "./ResizeContext";
import "./resize.sass"
import {nullResizeElement} from "../../nullables";

type Props = {}

export type OrderedResizeElement = {
  type: "resize-element"
} & ResizeValue

export type OrderedElement = {
  key: string
} & ({
  type: "resize-bar"
} | OrderedResizeElement)

export const Resize: FC<Props> = ({children}) => {
  const [resizes, setResizes] = useState<Resizes>(() => ({}))
  const [resizeBars, setResizeBars] = useState<string[]>(() => [])
  const [orderedElements, setOrderedElements] = useState<OrderedElement[]>(() => [])
  const [styles, setStyles] = useState<CSSProperties>(() => ({}))
  const insertResize = useCallback((key: string, value: ResizeValue) => {
    setResizes(resizes => ({
      ...resizes,
      key: value,
    }))
    setOrderedElements(elements => [...elements, {key, type: "resize-element", ...value}])
  }, [setResizes])
  const insertResizeBar = useCallback((key: string) => {
    setResizeBars(bars => ({
      ...bars,
      key,
    }))
    setOrderedElements(elements => [...elements, {key, type: "resize-bar"}])
  }, [setResizeBars])
  const removeResizeBar = useCallback((key: string) => {
    setResizeBars(bars => bars.filter(b => b !== key))
    setOrderedElements(elements => (
      elements.filter(e => e.key !== key)
    ))
  }, [])
  const removeResize = useCallback((key: string) => {
    setResizes(resizes => {
      const result = {...resizes}
      delete resizes[key]

      return result
    })
    setOrderedElements(elements => {
      const withoutResize = elements.filter(e => e.key !== key)
      const withoutDoubleInResizeBars = withoutResize.filter((e, i) => {
        const next = withoutResize[i + 1]
        return !(e.type === "resize-bar" && next?.type === "resize-bar")
      })

      return withoutDoubleInResizeBars
    })
  }, [])
  const barSiblings = useCallback((barKey: string): [OrderedResizeElement, OrderedResizeElement] => {
    const barIndex = orderedElements.findIndex(b => b.key === barKey)

    const leftResized = orderedElements[barIndex - 1] ?? nullResizeElement
    const rightResized = orderedElements[barIndex + 1] ?? nullResizeElement
    if (leftResized.type === "resize-element" && rightResized.type === "resize-element") {
      return [leftResized, rightResized]
    }
    if (leftResized.type === "resize-bar" && rightResized.type === "resize-element") {
      return [nullResizeElement, rightResized]
    }
    if (leftResized.type === "resize-element" && rightResized.type === "resize-bar") {
      return [leftResized, nullResizeElement]
    }

    return [nullResizeElement, nullResizeElement]
  }, [orderedElements])
  const moveLeft = useCallback((barKey: string, value: number) => {
    const [leftResized, rightResized] = barSiblings(barKey)

    leftResized.decreaseWidth(value)
    rightResized.increaseWidth(value)
  }, [orderedElements, barSiblings])
  const siblingsMinWidth = useCallback((barKey: string): [number, number] => {
    const [leftResized, rightResized] = barSiblings(barKey)

    return [leftResized.minWidth(), rightResized.minWidth()]
  }, [barSiblings])
  const siblingsWidth = useCallback((barKey: string): [number, number] => {
    const [leftResized, rightResized] = barSiblings(barKey)

    return [leftResized.width(), rightResized.width()]
  }, [barSiblings])
  const disableUserSelect = useCallback(() => {
    setStyles(styles => ({
      ...styles,
      userSelect: "none",
    }))
  }, [])
  const activateUserSelect = useCallback(() => {
    setStyles(styles => ({
      ...styles,
      userSelect: "initial",
    }))
  }, [])

  return (
    <ResizeBarsContext.Provider
      value={{
        items: resizeBars,
        moveLeft,
        insert: insertResizeBar,
        remove: removeResizeBar,
        siblingsMinWidth,
        siblingsWidth,
      }}
    >
      <ResizesContext.Provider
        value={{
          items: resizes,
          insert: insertResize,
          remove: removeResize,
        }}
      >
        <ParentResizeContext.Provider
          value={{
            disableUserSelect,
            activateUserSelect,
          }}
        >
          <div
            className="resizer"
            style={styles}
          >
            {children}
          </div>
        </ParentResizeContext.Provider>
      </ResizesContext.Provider>
    </ResizeBarsContext.Provider>
  )
}