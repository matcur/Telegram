export const debounce = <T extends (...args: any) => any>(f: T, ms: number) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    return new Promise<ReturnType<T>>(res => {
      timeout = setTimeout(() => {
        res(f(...args))
      }, ms)
    })
  }
}