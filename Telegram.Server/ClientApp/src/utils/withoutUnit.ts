export const withoutUnit = (value: string | number | undefined) => {
  if (!value) {
    return 0
  }
  if (typeof value === "number") {
    return value as number
  }

  return parseInt(value.substring(0, value.length - 2)) ?? 0
}