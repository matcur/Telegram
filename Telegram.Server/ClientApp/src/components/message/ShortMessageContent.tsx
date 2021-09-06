import React, {FC} from 'react'
import {Content} from "models";

type Props = {
  content: Content[]
}

export const ShortMessageContent: FC<Props> = ({content}: Props) => {
  const text = content.find(c => c.type === 'Text')

  return (
    <span className="last-message-content">{text?.value?? ''}</span>
  )
}