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
    const index = array.indexOf(item)

    array.splice(index, 1);
    setArray([...array])
  }

  return {
    value: array,
    add,
    remove,
  }
}