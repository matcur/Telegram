// TODO: add typescript support with FuncArgs?
export const callWith = (array: ((...v: any[]) => void)[], ...values: any[]) => {
  array.forEach(f => f(...values))
}