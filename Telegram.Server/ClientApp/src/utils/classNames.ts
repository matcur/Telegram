export type ClassName = 
  | string 
  | Record<string, boolean | undefined | null | number> 
  | undefined
  | null
  | false
  | number

export const classNames = (...classes: ClassName[]) => {
  const prepare = (className: ClassName): string => {
    if (!className) {
      return ""
    }
    if (typeof className === "number") {
      return ""
    }
    if (typeof className === "object") {
      return Object.entries(className)
        .filter(([name, visible]) => visible)
        .map(([name]) => name)
        .join(" ")
    }
    return className
  }
  
  return classes.map(prepare).filter(Boolean).join(" ")
}