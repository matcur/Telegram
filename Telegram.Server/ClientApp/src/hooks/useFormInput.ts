import React, {useState} from "react";

export type InputEvent = React.FormEvent<HTMLInputElement>

export const useFormInput = (initialState: string = '') => {
  const [value, setValue] = useState(initialState)
  const handleChange = (e: InputEvent | string) => {
    if (typeof e === 'string') {
      setValue(e)

      return
    }

    setValue(e.currentTarget.value)
  }

  return {
    value,
    onChange: handleChange
  }
}