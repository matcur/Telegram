export const preventClickBubble = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  e.preventDefault()
  e.stopPropagation()
}