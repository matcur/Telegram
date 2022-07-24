import React, {FC} from 'react'
import {Content} from "models";
import {classNames} from "../../utils/classNames";

type Props = {
  content: Content[]
  className?: string
}

export const ImagesContent: FC<Props> = ({content, className}: Props) => {
  return <>
    {content.map(c =>
      <img
        src={c.value}
        className={classNames('image-content', className)}
        alt=""
      />)}
  </>
}