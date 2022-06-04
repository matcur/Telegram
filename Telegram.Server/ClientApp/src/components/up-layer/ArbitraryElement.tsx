import {FC, useEffect, useRef, useState} from "react";
import {Position} from "../../utils/type";

type Props = {
  position: Position
}

export const ArbitraryElement: FC<Props> = ({children, position}) => {
  const [offset, setOffset] = useState(() => ({top: 0, left: 0}))
  const [contentSize, setContentSize] = useState(() => ({width: 0, height: 0}))
  const ref = useRef<HTMLDivElement>(null)
  
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
  }, [contentSize])
  
  useEffect(function onSizeChange() {
    const current = ref.current
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