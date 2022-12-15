import {useFlag} from "./useFlag";
import {useState} from "react";
import {Nothing} from "../utils/functions";
import {useFunction} from "./useFunction";

export const useModalVisible = <T = undefined>(): [boolean, T | undefined, ((data: T) => void), Nothing] => {
  const [visible, activate, hide] = useFlag(false)
  const [data, setData] = useState<T>()
  const show = useFunction((data: T) => {
    setData(data)
    activate()
  })
  
  return [visible, data, show, hide]
}