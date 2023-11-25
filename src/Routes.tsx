import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@hooks'
import { Login } from '@components/Login'
import { Dashboard } from '@components/Dashboard'

const PrivateRoutes = () => {
  const { authenticated } = useAuth()

  if (!authenticated) return <Navigate to='/' replace />

  return <Outlet />
}

const Routes = () => {
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