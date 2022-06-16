import React, {useEffect} from "react";

export const useOutsideClick = (callback: () => void, ref?:  React.RefObject<HTMLElement>) => {
  const element = ref && ref.current
  
  useEffect(function onChange() {
    if (!element) return

    const listener = (e: MouseEvent) => {
      if (element.contains(e.target as Node)) return
      
      callback()
    }
    
    document.addEventListener("mousedown", listener)

    return () => document.removeEventListener("mousedown", listener)
  }, [callback, element])
}