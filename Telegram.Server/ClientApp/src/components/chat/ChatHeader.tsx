import React, {FC} from 'react'
import {ClickHandler} from "../../utils/type";

type Props = {
  onClick: ClickHandler
}

export const ChatHeader: FC<Props> = ({children, onClick}) => {
  return (
    <div onClick={onClick} className="chat-header">
      {children}
    </div>
  )
}