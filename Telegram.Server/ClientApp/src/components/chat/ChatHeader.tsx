import React, {FC} from 'react'

type Props = {}

export const ChatHeader: FC<Props> = ({children}) => {
  return (
    <div className="chat-header">
      {children}
    </div>
  )
}