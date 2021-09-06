import React, {FC} from 'react'
import {Content} from "models";

type Props = {
  content: Content
  className: string
}

export const ImageContent: FC<Props> = ({content, className}: Props) => {
  return (
      <img
        src={content.value}
        className={`image-content ${className}`}
        alt=""/>
  )
}