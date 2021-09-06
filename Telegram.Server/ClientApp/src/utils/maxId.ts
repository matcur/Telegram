export const maxId = (items: {id: number}[]) => {
  if (items.length === 0) {
    return 0
  }

  let maxId = items[0].id
  items.forEach(i => {
    if (maxId < i.id) {
      maxId = i.id
    }
  })

  return maxId
}