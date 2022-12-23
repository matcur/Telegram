import {useFlag} from "./useFlag";
import {useState} from "react";
import {Nothing} from "../utils/functions";
import {useFunction} from "./useFunction";

export type ModalVisibleData<T> = {
  show: (data: T) => void,
  hide(): void
} & ({
  visible: true,
  data: T,
} | {
  visible: false,
  data: Record<string, undefined>,
})

export const useModalVisible = <T = undefined>(): ModalVisibleData<T> => {
  const [visible, activate, hide] = useFlag(false)
  const [data, setData] = useState<T | Record<string, undefined>>({})
  const show = useFunction((data: T) => {
    setData(data)
    activate()
  })
  
  // @ts-expect-error
  return {visible, data: data!, show, hide}
}