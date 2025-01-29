import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import AuthWrapper from './Components/AuthContext'

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthWrapper>
)
