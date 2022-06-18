import React, {FC} from 'react'
import {Content} from "models";

type Props = {
  content?: Content
  className?: string
}

export const TextContent: FC<Props> = ({content, className}: Props) => {
  if (!content) return null
  
  return (
    <div className={`text-content ${className}`}>
      {content.value}
    </div>
  )
}