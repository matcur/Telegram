export const toFormData = (data: any, form: FormData | null = null, namespace: string = '') => {
  let formData = form || new FormData()
  for (const key in data) {
    const value = data[key]
    if (!data.hasOwnProperty(key) || value === undefined) {
      continue
    }

    seed(value, formData, key, namespace)
  }

  return formData
}

function seed(value: any, formData: FormData, key: string, namespace: string) {
  const formKey = namespace? `${namespace}[${key}]`: key

  if (value instanceof Date) {
    formData.append(formKey, value.toDateString())
  } else if (value instanceof Array) {
    value.forEach((element, index) => {
      if (typeof element != 'object') {
        formData.append(`${formKey}[]`, element)
      }
      else {
        const multiDimensionKey = `${formKey}[${index}]`
        toFormData(element, formData, multiDimensionKey)
      }
    })
  } else if (typeof value === 'object' && !(value instanceof File)) {
    toFormData(value, formData, formKey)
  } else {
    formData.append(formKey, value.toString())
  }
}