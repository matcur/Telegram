import {useCallback, useState} from "react";
import {Nothing} from "../utils/functions";

export const useFlag = (init: boolean): [boolean, Nothing, Nothing] => {
  const [value, setValue] = useState(init)
  const activate = useCallback(() => setValue(true), [])
  const disable = useCallback(() => setValue(false), [])
  
  return [value, activate, disable]
}