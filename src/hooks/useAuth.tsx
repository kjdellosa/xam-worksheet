import { createContext, ReactNode, useState, useContext, useEffect } from 'react'
import useLocalStorage from './useLocalStorage';
import { users as stubData } from '../tests/users.data'

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: boolean;
  authenticate: (newState: User) => boolean,
  logout: () => void
}

interface Auth {
  branchId: number,
  userName: string,
  password: string
}

const initialValue = {
  authenticated: false,
  authenticate: () => { return false },
  logout: () => { }
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
      return false
    }
  }

  const logout = () => {
    removeAuthValue()
  }

  useEffect(() => {
    console.log(authValue)
    setUsers(stubData)
    if (authValue) setAuthenticated(true)
  }, [])

  return (
    <AuthContext.Provider value={{ authenticated, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const contextValue = useContext(AuthContext)
  return contextValue
}

export { AuthContext, AuthProvider, useAuth }