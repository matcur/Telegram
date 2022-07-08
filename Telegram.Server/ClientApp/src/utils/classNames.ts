export const classNames = (...classes: any[]) => {
  const filter = (className: any) => {
    if (typeof className === "function") {
      return false
    }
    
    return Boolean(className)
  }
  
  return classes.filter(filter).join(" ")
}