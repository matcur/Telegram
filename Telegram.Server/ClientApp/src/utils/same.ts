export const same = <T>(items: T[], predicate: (a: T, b: T) => boolean) => {
  for (let i = 0; i < items.length - 1; i++) {
    if (!predicate(items[i], items[i +1])) {
      return false
    }
  }

  return true
}