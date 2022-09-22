import React from "react";
import {createRef, FC, useCallback} from "react";
import {classNames} from "../../utils/classNames";
import {Nothing} from "../../utils/functions";

type Props = {
  className?: string
  onBottomTouch: Nothing
}

export const InfiniteScroll: FC<Props> = ({className, onBottomTouch, children}) => {
  const scroll = createRef<HTMLDivElement>()
  const onScroll = useCallback(() => {
    const current = scroll.current;
    if (!current) return
    
    if (current.clientHeight === current.scrollHeight) {
      onBottomTouch()
    }
  }, [])
  
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