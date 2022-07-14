import {useEffect, useState} from "react";

export function useAwait<T>(asyncValue: Promise<T> | (() => Promise<T>)): T | undefined;

export function useAwait<T>(asyncValue: Promise<T> | (() => Promise<T>), initValue: T): T;

export function useAwait<T>(asyncValue: Promise<T> | (() => Promise<T>), initValue?: T) {
  const [value, setValue] = useState(initValue)
  useEffect(() => {
    if (typeof asyncValue === "function") {
      asyncValue().then(setValue)
      return
    }
    asyncValue.then(setValue)
  }, [])
  
  return value
}