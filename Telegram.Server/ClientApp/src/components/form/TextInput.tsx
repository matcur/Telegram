import React, {FC} from 'react'
import {InputEvent} from "hooks/useFormInput";

type Props = {
  label: string
  input: {value: string, onChange: (e: InputEvent) => void}
  className?: string
}

export const TextInput: FC<Props> = ({className = '', label, input}) => {
  return (
    <div className={`form-group ${className}`} style={{display: 'block'}}>
      <label className="label">
        {label}
      </label>
      <input
        {...input}
        className="clear-input text-input form-input"/>
      <div className="input-line"/>
    </div>
  )
}