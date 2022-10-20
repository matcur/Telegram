import {RefObject, useEffect} from "react";
import {useFunction} from "./useFunction";

export const useFitScrollHeight = <T extends RefObject<HTMLTextAreaElement>>(ref: T) => {
  const element = ref.current
  useEffect(() => {
    if (!element) {
      return
    }

    element.style.height = "0"
    element.style.height = `${element.scrollHeight}px`
  }, [element])
  const fitScrollHeight = useFunction(() => {
    if (!element) {
      return
    }
    const {style} = element

    style.height = "0"
    style.height = `${element.scrollHeight}px`
  })
  
  return fitScrollHeight
}