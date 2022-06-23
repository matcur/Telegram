export const debounce = <T>(f: (...args: any[]) => T, ms: number) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: any[]) => {
    clearTimeout(timeout)
    return new Promise<T>(res => {
      timeout = setTimeout(() => {
        res(f(...args))
      }, ms)
    })
  }
}