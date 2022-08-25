import React, {FC} from 'react'
import {InputEvent} from "hooks/useFormInput";
import {classNames} from "../../utils/classNames";

export type TextFieldProps = {
  label: string
  input: {value?: string, onChange: (e: InputEvent) => void}
  className?: string
  labelClassName?: string
  inputClassName?: string
  isInvalid?: boolean
}

export const TextField: FC<TextFieldProps> = ({isInvalid = false, className = '', inputClassName, labelClassName, label, input}) => {
  return (
    <div className={classNames({
      [className]: true,
      "form-field": true,
      "invalid-group": isInvalid,
    })} style={{display: 'block'}}>
      <label className={classNames("label", labelClassName)}>
        {label}
      </label>
      <input
        {...input}
        className={classNames(
          inputClassName,
          "clear-input text-input form-input",
        )}
      />
      <div className="input-line"/>
    </div>
  )
}