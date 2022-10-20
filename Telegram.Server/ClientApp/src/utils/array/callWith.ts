// TODO: add typescript support with FuncArgs?
export const callWith = <T extends (...v: any[]) => void>
    (array: T[] | IterableIterator<T>, ...values: Parameters<T>) => {
  Array.from(array).forEach(f => f(...values))
}