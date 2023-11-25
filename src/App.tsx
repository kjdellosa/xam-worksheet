import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'
import { AuthProvider } from '@hooks/useAuth'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
