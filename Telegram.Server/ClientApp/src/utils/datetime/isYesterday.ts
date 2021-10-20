import {inSameMonth} from "./inSameMonth";

export const isYesterday = (first: Date) => {
  const now = new Date()
  
  return inSameMonth(first, now) && (now.getDate() - first.getDate() === 1)
}