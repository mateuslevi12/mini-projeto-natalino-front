import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './global.css'
import { ThemedContextProvider } from './hooks/useTheme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemedContextProvider>
      <App />
    </ThemedContextProvider>
  </React.StrictMode>,
)
