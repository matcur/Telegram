export const empty = (value: any[] | undefined) => {
  if (value === undefined) {
    return false;
  }
  
  return value && value.length === 0;
}