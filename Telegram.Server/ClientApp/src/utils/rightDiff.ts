export const rightDiff = <T extends Record<any, any>, K extends Partial<T>>(left: T, right: K): Partial<K> => {
  const changes: Partial<T> = {}
  const keys = Object.keys(right) as (keyof T)[]
  keys.forEach(key => {
    if (right[key] !== left[key]) {
      changes[key] = right[key]
    }
  })

  return changes;
}