import React, { createContext, useContext, useEffect, useReducer } from 'react'
import useLocalStorage from './useLocalStorage'
import { message } from 'antd'

interface UserListContextType {
  users: User[]
  addUser: (newUser: User) => void
  deleteUser: (id: number) => void
}

export const UserListContext = createContext<UserListContextType | null>(null)

const SET_STATE = 'SET_STATE'

type Action = {
  type: string
  payload: { field: string, value: any }
}

const reducer = (state: Record<string, any> = {}, { type, payload }: Action) => {
  switch (type) {
    case SET_STATE: {
      const { field, value } = payload
      return {
        ...state,
        [field]: value,
      }
    }
    default:
      throw new Error('Unrecognized Action')
  }
}

const UserListProvider = ({ children }) => {
  const [values, dispatch] = useReducer(reducer, {
    users: [],
  })

  const { value: localstorageUsers, setValue: setLocalStorageUsers } = useLocalStorage('users')

  useEffect(() => {
    setUsers(localstorageUsers)
  }, [])

  const { users } = values

  const setUsers = (val: User[]) => {
    setLocalStorageUsers(val)
    dispatch({
      type: SET_STATE,
      payload: { field: 'users', value: val },
    })
  }

  const addUser = (newUser: User) => {
    setUsers([...users, newUser])
    message.success('User added successfully.')
  }

  const deleteUser = (id: number) => {
    const updatedData = users.filter((v: User) => v.branchId !== id)
    setUsers(updatedData)
    message.success('User deleted successfully.')
  }

  return (
    <UserListContext.Provider
      value={{
        users,
        addUser,
        deleteUser,
      }}
    >
      {children}
    </UserListContext.Provider>
  )
}

export default UserListProvider

export const useUserList = () => {
  const contextValue = useContext(UserListContext)
  if (!contextValue) {
    throw new Error('useUserList must be used within a UserListProvider')
  }
  return contextValue
}