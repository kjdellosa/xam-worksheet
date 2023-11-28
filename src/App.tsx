import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Dashboard, Login } from '@components'
import { PrivateRoutes } from './Routes'
import { AuthProvider } from '@hooks/useAuth'
import UserListProvider from '@hooks/useUserList'

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      element: <PrivateRoutes />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />
        }
      ]
    }
  ])

  return (
    <UserListProvider>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>
    </UserListProvider>
  )
}

export default App
