import {useEffect, useState} from "react";

export const useTimer = (seconds: number) => {
  const [next, setNext] = useState(seconds)
  
  useEffect(() => {
    const interval = setInterval(() => setNext(value => value + 1), 1000)
    setNext(seconds)
    
    return () => clearInterval(interval)
  }, [seconds])
  
  return next
}