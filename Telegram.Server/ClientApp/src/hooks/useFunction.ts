import {useCallback, useEffect, useLayoutEffect, useRef} from "react";

export const useFunction = <T extends (...args: any[]) => any>(func: T) => {
  const ref = useRef(func)
  useEffect(() => {
    ref.current = func
  }, [func])

  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    return ref.current(...args)
  }, [])
}