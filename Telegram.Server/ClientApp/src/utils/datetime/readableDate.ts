import {inSameDay} from "./inSameDay";
import {isYesterday} from "./isYesterday";
import {inSameWeek} from "./inSameWeek";

const addNeededZero = (value: number) => value.toString().padStart(2, "0")

const readableDayWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const readableDate = (value: string) => {
  const date = new Date(value)
  const now = new Date()
  
  if (inSameDay(date, now)) {
    return `${addNeededZero(date.getHours())}:${addNeededZero(date.getMinutes())}`
  }
  
  if (isYesterday(date)) {
    return 'yesterday'
  }
  if (inSameWeek(date, now)) {
    return readableDayWeek[date.getDay()]
  }
  
  return `${addNeededZero(date.getDate())}:${addNeededZero(date.getMonth())}:${date.getFullYear()}`
}