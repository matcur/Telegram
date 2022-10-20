import React from "react";
import {createRef, FC} from "react";
import {classNames} from "../../utils/classNames";
import {Nothing} from "../../utils/functions";
import {useFunction} from "../../hooks/useFunction";

type Props = {
  className?: string
  onBottomTouch: Nothing
}

export const InfiniteScroll: FC<Props> = ({className, onBottomTouch, children}) => {
  const scroll = createRef<HTMLDivElement>()
  const onScroll = useFunction(() => {
    const current = scroll.current;
    if (!current) return
    
    if (current.clientHeight === current.scrollHeight) {
      onBottomTouch()
    }
  })
  
  return (
    <div
      ref={scroll}
      className={classNames(className)}
      onScroll={onScroll}
    >
      {children}
    </div>
  )
}