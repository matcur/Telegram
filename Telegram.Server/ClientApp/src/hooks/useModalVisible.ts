import {useFlag} from "./useFlag";
import {useCallback, useState} from "react";
import {Nothing} from "../utils/functions";

export const useModalVisible = <T = undefined>(): [boolean, T | undefined, ((data: T) => void), Nothing] => {
  const [visible, activate, disable] = useFlag(false)
  const [data, setData] = useState<T>()
  const show = useCallback((data: T) => {
    setData(data)
    activate()
  }, [])
  
  return [visible, data, show, disable]
}