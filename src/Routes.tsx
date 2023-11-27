import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@hooks'

export const PrivateRoutes = () => {
  const { authenticated } = useAuth()

  if (!authenticated) return <Navigate to='/' replace />

  return <Outlet />
}