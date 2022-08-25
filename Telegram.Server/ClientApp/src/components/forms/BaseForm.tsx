import React, {FC, Ref} from "react";
import {classNames} from "../../utils/classNames";

type Props = {
  className?: string
  formRef?: Ref<HTMLDivElement>
  inDark?: boolean
}

export const BaseForm: FC<Props> = ({formRef, inDark, className, children}) => {
  return (
    <div ref={formRef} className={classNames({
      "in-dark-form": inDark,
      "form": true,
    }, className)}>
      {children}
    </div>
  )
}