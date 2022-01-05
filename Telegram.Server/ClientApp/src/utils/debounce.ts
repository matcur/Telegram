export const debounce = (f: (...args: any[]) => void, ms: number) => {
  let allow = true
  
  return (...args: any[]) => {
    if (allow) {
      allow = false
      setTimeout(() => allow = true, ms)
      f(...args)
    }
  }
}