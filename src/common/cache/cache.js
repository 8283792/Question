import storage from 'good-storage'

const USER_DATA = '_user'
const USER_SESSION = '_userSess'

function setStorage(key, value) {
  storage.set(key, value)
  return value
}

export function setUserData(data) {
  return setStorage(USER_DATA, data)
}

export function loadUserData() {
  return storage.get(USER_DATA, {})
}

export function loadUserSess() {
  return storage.get(USER_SESSION, {})
}

export function clearUser() {
  storage.remove(USER_DATA)
  storage.remove(USER_SESSION)
  return []
}
