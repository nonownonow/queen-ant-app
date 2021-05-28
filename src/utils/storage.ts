const storage = window.sessionStorage
export function get (key: string) {
  return storage.getItem(key)
}
export function set (key: string, value: string) {
  storage.setItem(key, value)
}
export function remove (key: string) {
  storage.removeItem(key)
}
export default { get, set, remove }
