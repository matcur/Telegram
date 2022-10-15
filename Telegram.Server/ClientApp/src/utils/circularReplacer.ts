export const circularReplacer = () => {
  const set = new WeakSet()
  return (key: any, value: any) => {
    if (typeof key === "string" && key.startsWith("_")) {
      return
    }
    if (typeof value === "object" && value !== null) {
      if (set.has(value)) {
        return
      }
      set.add(value)
    }
    return value
  }
}