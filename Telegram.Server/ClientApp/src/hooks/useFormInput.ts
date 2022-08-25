import React, {useState} from "react";

export type InputEvent = React.FormEvent<HTMLInputElement | HTMLTextAreaElement>

export const useFormInput = (initialState: string = '') => {
  const [value, setValue] = useState(initialState)
  const onChange = (e: InputEvent | string) => {
    if (typeof e === 'string') {
      setValue(e)

      return
    }

    setValue(e.currentTarget.value)
  }

  return {
    value,
    onChange
  }
}