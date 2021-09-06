// using for filtration by search value
export const like = (value: string, search: string) => {
  return value.toLowerCase().includes(search.toLowerCase())
}