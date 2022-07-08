import React, {FC} from "react";
import {classNames} from "../../utils/classNames";

type Props = {
  className?: string
}

export const BaseForm: FC<Props> = ({className, children}) => {
  return (
    <div className={classNames("form", className)}>
      {children}
    </div>
  )
}