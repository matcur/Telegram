export const isValidPhone = (number: string) => {
  return number.match(/(7|8|9)\d{10}/)
}