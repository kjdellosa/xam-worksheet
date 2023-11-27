import { createContext, ReactNode, useState, useContext, useEffect } from 'react'
import useLocalStorage from './useLocalStorage';
import { redirect } from 'react-router-dom';
import { users as stubData } from '../tests/users.data'

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: boolean;
  authenticate: (newState: User) => boolean,
  logout: () => void,
  user: User | null
}

interface Auth {
  branchId: number,
  userName: string,
  password: string
}

const initialValue = {
  authenticated: false,
  authenticate: () => false,
  logout: () => { },
  user: null
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: Props) => {
  const {
    value: authValue,
    setValue: setAuthValue,
    removeValue: removeAuthValue
  } = useLocalStorage('auth')

  const { value: users, setValue: setUsers } = useLocalStorage('users')

  const [authenticated, setAuthenticated] = useState(initialValue.authenticated)

  // Check if user exists
  const authenticate = (data: Auth) => {
    const { branchId, userName, password } = data

    const foundUser = users.find((u: User) => {
      return u.password === password &&
        u.branchId === branchId &&
        u.userName === userName
    })

    if (foundUser) {
      setAuthValue(foundUser)
      setAuthenticated(true)
      return true
    } else {
      setAuthenticated(false)
      return false
    }
  }

  const logout = () => {
    setAuthenticated(false)
    removeAuthValue()
    redirect('/')
  }

  useEffect(() => {
    if (!users) setUsers(stubData)
    if (authValue) setAuthenticated(true)
  }, [])

  return (
    <AuthContext.Provider value={{ authenticated, authenticate, logout, user: authValue }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const contextValue = useContext(AuthContext)
  return contextValue
}

export { AuthContext, AuthProvider, useAuth }