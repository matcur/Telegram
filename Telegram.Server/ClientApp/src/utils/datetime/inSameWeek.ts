export const yearWeek = (date: Date) => {
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))

  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

export const inSameWeek = (left: Date, right: Date) => {
  return yearWeek(left) === yearWeek(right)
}