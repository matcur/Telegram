import {useState} from "react";

export const useRandomString = () => {
  const [value] = useState(() => {
    return (Math.random() + 1).toString(36).substring(7)
  })

  return value
}