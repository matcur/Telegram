import {inSameMonth} from "./inSameMonth";

export const inSameDay = (first: Date, second: Date) => {
  return inSameMonth(first, second) &&
    first.getDate() === second.getDate()
}