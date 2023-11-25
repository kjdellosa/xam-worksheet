import { useState, useEffect } from 'react'

const useLocalStorage = (keyName: string) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(keyName)

    try {
      const parsedValue = JSON.parse(storedValue || '')
      return parsedValue
    } catch (error) {
      return storedValue
    }
  })

  useEffect(() => {
    const stringifiedValue = JSON.stringify(value)
    localStorage.setItem(keyName, stringifiedValue)
  }, [value])

  const removeValue = () => {
    localStorage.removeItem(keyName)
  }

  return { value, setValue, removeValue }
}

export default useLocalStorage