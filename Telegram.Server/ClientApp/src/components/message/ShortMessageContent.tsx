import React, {FC} from 'react'
import {Content} from "models";
import imageIcon from "public/images/image-icon.png"
import leftPart from "../../public/images/start/start-left-part.png";

type Props = {
  content: Content[]
}

export const ShortMessageContent: FC<Props> = ({content}: Props) => {
  const text = content.find(c => c.type === 'Text')
  const hasImage = content.find(c => c.type === 'Image')

  return (
    <span className="last-message-content">
      {hasImage && <img src={imageIcon} alt=""/>}
      <span className="last-message-content__text">{text?.value?? ''}</span>
    </span>
  )
}