export const compareObjectDate = <T, P extends keyof T>(dateField: P) => {
  return (left: T, right: T) => {
    const leftDate = new Date(left[dateField] as unknown as string)
    const rightDate = new Date(right[dateField] as unknown as string)
    
    if (leftDate === rightDate) return 0

    return leftDate < rightDate? 1: -1
  }
}