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
    setArray(oldValue => {
      const newValue = [...oldValue]
      const index = newValue.indexOf(item)
      if (index > -1) {
        newValue.splice(index, 1);
      }
      
      return newValue
    })
  }

  return {
    value: array,
    add,
    remove,
  }
}