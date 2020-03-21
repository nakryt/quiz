export const isEmpty = (obj:{}|[]) => {
  if (!obj) {
    return true
  }
  if (obj instanceof Array) {
    if (!obj.length)
      return true
    return false
  }
  if (!Object.keys(obj).length) {
    return true
  }
}

export const isFullForm = (obj:{[key:string]:string}|[]):boolean => {
  if (isEmpty(obj)) {
    return false
  }

  const resArr = Object.entries(obj).map(([key, value]) => {
    if (value !== '' && Number.isInteger(+value)) {
      return false
    } else {
      if (value.length === 0) {
        return true
      }
      return false
    }
  })
  return !resArr.some(i => i)
}

export default {
  isFullForm,
  isEmpty
}
