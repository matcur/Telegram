import React, {useEffect} from "react";

export const useOutsideClick = (callback: () => void, ref?:  React.RefObject<HTMLElement>, ...dep: any[]) => {
  useEffect(function onChange() {
    const element = ref && ref.current
    if (!element) return

    const listener = (e: MouseEvent) => {
      if (element.contains(e.target as Node)) return
      
      callback()
    }
    
    document.addEventListener("mousedown", listener)

    return () => document.removeEventListener("mousedown", listener)
  }, [callback, ...dep])
}