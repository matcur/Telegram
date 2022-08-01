import React, {RefObject} from "react";
import {ClassName, classNames} from "../../utils/classNames";

type Props = {
  creationDate: Date | undefined
  className?: ClassName
  valueRef?: RefObject<HTMLSpanElement>
}

export const MessageCreationDate = ({valueRef, creationDate, className}: Props) => {
  return (
    <span ref={valueRef} className={classNames("message-created-at", className)}>
      {creationDate && `${creationDate.getHours()}:${creationDate.getMinutes()}`}
    </span>
  )
}