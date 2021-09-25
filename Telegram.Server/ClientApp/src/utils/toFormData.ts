export const toFormData = (data: any, form: FormData | null = null) => {
  let formData = form || new FormData()
  for (const key in data) {
    const value = data[key]
    if (!data.hasOwnProperty(key) || value === undefined) {
      continue
    }

    seed(value, formData, key);
  }

  return formData
}

function seed(value: any, formData: FormData, key: string) {
  if (value instanceof Date) {
    formData.append(key, value.toDateString())
  } else if (value instanceof Array) {
    value.forEach(element => {
      if (typeof element != 'object')
        formData.append(`${key}[]`, element)
      else {
        toFormData(element, formData)
      }
    })
  } else if (typeof value === 'object' && !(value instanceof File)) {
    toFormData(value, formData)
  } else {
    formData.append(key, value.toString())
  }
}