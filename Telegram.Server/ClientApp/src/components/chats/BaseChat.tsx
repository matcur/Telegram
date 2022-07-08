import React, {FC} from "react";
import {LoadingChat} from "../chat/LoadingChat";

type Props = {
  loaded: boolean
}

export const BaseChat: FC<Props> = ({loaded, children}) => {
  if (!loaded) {
    return <LoadingChat/>
  }
  
  return (
    <div className="chat">
      {children}
    </div>
  )
}