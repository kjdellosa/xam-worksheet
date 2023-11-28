import { useState } from 'react'

const useLocalStorage = (keyName: string) => {
  const [value, _setValue] = useState(() => {
    const storedValue = localStorage.getItem(keyName)

    try {
      const parsedValue = JSON.parse(storedValue || '')
      return parsedValue
    } catch (error) {
      return storedValue
    }
  })

  const setValue = (newValue: object) => {
    _setValue(newValue)
    localStorage.setItem(keyName, JSON.stringify(newValue))
  }

  const removeValue = () => {
    localStorage.removeItem(keyName)
  }

  return { value, setValue, removeValue }
}

export default useLocalStorage