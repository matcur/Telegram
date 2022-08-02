import {inSameDay} from "./inSameDay";
import {isYesterday} from "./isYesterday";

const addNeededZero = (value: number) => value.toString().padStart(2, "0")

export const readableDate = (value: string) => {
  const date = new Date(value)
  const now = new Date()
  
  if (inSameDay(date, now)) {
    return `${addNeededZero(date.getHours())}:${addNeededZero(date.getMinutes())}`
  }
  
  if (isYesterday(date)) {
    return 'yesterday'
  }
  
  return `${addNeededZero(date.getDate())}:${addNeededZero(date.getMonth())}:${date.getFullYear()}`
}