export const splitByThousands = (value: string | number) => {
  value = value.toString()

  const split = value.split('').reverse()
  let commInserted = 0
  let byThreeSectionCount = (value.length / 3)
  if (byThreeSectionCount % 1 === 0) {
    byThreeSectionCount--
  }

  for (let i = 1; i <= byThreeSectionCount; i++) {
    const newCommaPosition = i * 3 + commInserted

    split.splice(newCommaPosition, 0, ',')
    commInserted++
  }

  return split.reverse().join('')
}