export const empty = (value: any[] | undefined) => {
  if (value == null) {
    return true;
  }
  
  return value && value.length === 0;
}

export const filled = (value: any[] | undefined): value is [] => {
  return !empty(value)
}