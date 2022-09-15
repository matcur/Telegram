import React, {FC, Ref} from "react";
import {classNames} from "../../utils/classNames";

type Props = {
  className?: string
  formRef?: Ref<HTMLDivElement>
}

export const BaseForm: FC<Props> = ({formRef, className, children}) => {
  return (
    <div ref={formRef} className={classNames("form", className)}>
      {children}
    </div>
  )
}