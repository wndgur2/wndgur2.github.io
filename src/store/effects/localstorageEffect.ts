import { DefaultValue, type AtomEffect } from 'recoil'

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue) as T)
      } catch {
        setSelf(new DefaultValue())
      }
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }
