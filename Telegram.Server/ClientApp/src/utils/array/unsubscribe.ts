export const unsubscribe = (callbacks: ((...args: any[]) => void)[], callback: (...args: any[]) => void) => {
  return () => {
    const index = callbacks.indexOf(callback)
    if (index === -1) {
      return
    }

    callbacks.splice(index)
  }
}