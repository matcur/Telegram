import React, {CSSProperties, FC} from "react";
import {LoadingChat} from "../chat/LoadingChat";
import {classNames} from "../../utils/classNames";

type Props = {
  loaded: boolean
  style?: CSSProperties
  className?: string
}

export const BaseChat: FC<Props> = ({loaded, children, style, className}) => {
  if (!loaded) {
    return <LoadingChat/>
  }
  
  return (
    <div
      className={classNames(className, "chat")}
      style={style}
    >
      {children}
    </div>
  )
}