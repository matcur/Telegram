import React, {createRef, FC, useEffect, useState} from 'react'
import {Content} from "models";
import {MessageCreationDate} from "./MessageCreationDate";
import {TextRows} from "./TextRows";

type Props = {
  content?: Content
  className?: string
  creationDate?: Date
}

export const TextContent: FC<Props> = ({content, className, creationDate}: Props) => {
  const ref = createRef<HTMLDivElement>()
  const rowsRef = createRef<HTMLDivElement>()
  const dateRef = createRef<HTMLDivElement>()
  const [lastRowWidth, setLastRowWidth] = useState(0)
  useEffect(() => {
    if (!ref.current || !rowsRef.current || !dateRef.current) {
      return
    }

    const contentWidth = rowsRef.current.getBoundingClientRect().width;
    const dataWidth = dateRef.current.clientWidth;
    const maxContentWidth = 440;
    const rightPadding = 10;
    if (maxContentWidth > contentWidth + dataWidth + 2 * rightPadding + 5) {
      ref.current.style.paddingRight = `${dataWidth + rightPadding + 5}px`
      return
    }
    if (contentWidth - dataWidth < lastRowWidth) {
      ref.current.style.paddingBottom = "20px"
    } else {
      ref.current.style.paddingBottom = ""
    }
  }, [lastRowWidth])
  if (!content) return null
  
  return (
    <div ref={ref} className={`text-content ${className}`}>
      <TextRows rowsRef={rowsRef} text={content.value ?? ""} setLastRowWidth={setLastRowWidth}/>
      <MessageCreationDate valueRef={dateRef} creationDate={creationDate}/>
    </div>
  )
}