import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Dashboard, Login } from '@components'
import { PrivateRoutes } from './Routes'
import { AuthProvider } from '@hooks/useAuth'
import { userListLoader } from '@hooks/useUserList'
import { userListAction } from '@hooks/useUserListMutations'

function App() {
  const queryClient = new QueryClient()

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
          element: <Dashboard />,
          loader: userListLoader(queryClient),
          action: userListAction(queryClient)
        }
      ]
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>

        <RouterProvider router={routes} />

      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
