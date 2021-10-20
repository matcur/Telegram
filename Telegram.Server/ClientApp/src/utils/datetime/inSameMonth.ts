export const inSameMonth = (first: Date, second: Date) => {
  return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth()
}