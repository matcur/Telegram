import {useState} from "react";
import {Nothing} from "../utils/functions";
import {useFunction} from "./useFunction";

export const useFlag = (init: boolean): [boolean, Nothing, Nothing] => {
  const [value, setValue] = useState(init)
  const activate = useFunction(() => setValue(true))
  const disable = useFunction(() => setValue(false))
  
  return [value, activate, disable]
}