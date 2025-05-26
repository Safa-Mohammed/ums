import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/300.css';
import AuthContextProvider from './Components/context/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthContextProvider>
)
