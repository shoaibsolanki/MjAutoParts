import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SnackbarProvider } from 'notistack'
import { ProductProvider } from './Context/ProductContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

<ProductProvider>
    <SnackbarProvider autoHideDuration={2000}>
    <App />
    </SnackbarProvider>
</ProductProvider>
  </StrictMode>
)
