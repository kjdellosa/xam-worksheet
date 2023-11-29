import { Routes as Router, Route, Outlet, Navigate } from 'react-router-dom'
import { Dashboard, Login } from '@components'
import { useAuth } from '@hooks'

export const PrivateRoutes: React.FC = () => {
  const { authenticated } = useAuth()

  if (!authenticated) return <Navigate to='/' replace />

  return <Outlet />
}

const Routes: React.FC = () => {
  return (
    <Router>
      <Route path='/' element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Router>
  )
}

export default Routes