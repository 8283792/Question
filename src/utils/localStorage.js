const delOneStorage = (key) => {
  if (!key) return false
  return delete localStorage[key]
}

const delAnyStorage = (keys) => {
  if (!keys || !keys.length) return false
  let flag = false
  keys.forEach((key) => {
    flag = delete localStorage[key] ? true : false
  })
  return flag
}

export { delOneStorage, delAnyStorage }
