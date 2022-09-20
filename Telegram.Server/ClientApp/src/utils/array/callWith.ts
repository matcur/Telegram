export const callWith = <T>(array: ((v: T) => void)[], value: T) => {
  array.forEach(f => f(value))
}