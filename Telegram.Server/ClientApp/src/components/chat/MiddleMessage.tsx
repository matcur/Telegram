import React, {FC} from "react";
import {trackHeight} from "../../utils/trackHeight";

type Props = {
  id: number
  onMessageHeightChange(messageId: number, height: number): void
}

export const MiddleMessage: FC<Props> = ({id, onMessageHeightChange, children}) => {
  return(
    <div className="middle-message" ref={trackHeight(value => onMessageHeightChange(id, value))}>
      <div className="middle-message-value">{children}</div>
    </div>
  )
}