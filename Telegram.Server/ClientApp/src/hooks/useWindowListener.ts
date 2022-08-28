import {useEffect} from "react";

export const useWindowListener = <T extends keyof WindowEventMap>(callback: (e: WindowEventMap[T]) => void, key: T) => {
  useEffect(() => {
    window.addEventListener(key, callback)
    
    return () => window.removeEventListener(key, callback)
  }, [callback, key])
}