import React, {FC, useEffect, useRef, useState} from "react";
import {Position} from "../../utils/type";
import {useOutsideClick} from "../../hooks/useOutsideClick";

type Props = {
  position: Position
  onOutsideClick(): void
}

export const ArbitraryElement: FC<Props> = ({children, position, onOutsideClick}) => {
  const [offset, setOffset] = useState(() => ({top: 0, left: 0}))
  const [contentSize, setContentSize] = useState(() => ({width: 0, height: 0}))
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(onOutsideClick, ref)
  
  useEffect(function calculateOffset() {
    const width = document.body.clientWidth
    const height = document.body.clientHeight
    
    const result = {top: 0, left: 0}
    if (width <= (position.left + contentSize.width)) {
      result.left = -contentSize.width
    }
    
    if (height <= (position.top + contentSize.height)) {
      result.top = -contentSize.height
    }
    
    setOffset(result)
  }, [contentSize.height, contentSize.width])
  
  useEffect(function onSizeChange() {
    const current = ref && ref.current
    if (!current) return
    
    setContentSize({width: current.clientWidth, height: current.clientHeight})
  }, [offset])
  
  return (
    <div
      ref={ref}
      className="arbitrary-element"
      style={{
        top: position.top + offset.top,
        left: position.left + offset.left,
      }}
    >
      {children}
    </div>
  )
}