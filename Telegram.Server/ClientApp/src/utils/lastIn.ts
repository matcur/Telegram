export const lastIn = <T>(items: T[], def: T) => {
  const length = items.length
  if (length === 0) {
    return def
  }

  return items[length - 1]
}