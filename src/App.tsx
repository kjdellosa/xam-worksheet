import './App.css'
import { AuthProvider } from '@hooks/useAuth'
import UserListProvider from '@hooks/useUserList'
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes'

function App() {
  return (
    <BrowserRouter>
      <UserListProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </UserListProvider>
    </BrowserRouter>
  )
}

export default App
