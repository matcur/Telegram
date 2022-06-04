import {useState} from "react";

export const useArray = <T>(...initialValue: T[]) => {
  const [array, setArray] = useState<T[]>(initialValue)

  const add = (item: T | T[]) => {
    if (Array.isArray(item)) {
      return setArray([...array, ...item])
    }
    setArray([...array, item])
  }
  const remove = (item: T) => {
    setArray(value => {
      const index = value.indexOf(item)
      if (index > -1) {
        value.splice(index, 1);
      }
      
      return value
    })
  }

  return {
    value: array,
    add,
    remove,
  }
}