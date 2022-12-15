export const trackHeight = (onChange: (value: number) => void) => {
  return (ref: HTMLDivElement | null) => onChange(ref?.clientHeight ?? 0)
}