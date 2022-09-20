export const addIfNotExists = (callbacks: ((...args: any[]) => void)[], callback: (...args: any[]) => void) => {
  const index = callbacks.indexOf(callback)
  if (index !== -1) {
    return
  }

  callbacks.push(callback)
}