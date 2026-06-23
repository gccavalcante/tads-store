import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { FavoritosProvider } from './contexts/FavoritosContext'
import { CarrinhoProvider } from './contexts/CarrinhoContext' // Importação Nova
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritosProvider>
          <CarrinhoProvider>
            <App />
          </CarrinhoProvider>
        </FavoritosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)