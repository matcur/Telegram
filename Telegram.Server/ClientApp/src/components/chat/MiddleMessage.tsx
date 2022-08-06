import React, {FC} from "react";

type Props = {}

export const MiddleMessage: FC<Props> = ({children}) => {
  return(
    <div className="middle-message">
      <div className="middle-message-value">{children}</div>
    </div>
  )
}