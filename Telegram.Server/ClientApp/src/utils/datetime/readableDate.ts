import {inSameDay} from "./inSameDay";
import {isYesterday} from "./isYesterday";

export const readableDate = (value: string) => {
  const date = new Date(value)
  const now = new Date()
  
  if (inSameDay(date, now)) {
    return `${date.getHours()}:${date.getMinutes()}`
  }
  
  if (isYesterday(date)) {
    return 'yesterday'
  }
  
  return `${date.getDate()}:${date.getMonth()}:${date.getFullYear().toString().substr(2)}`
}