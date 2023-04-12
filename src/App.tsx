import React from 'react'
import './App.css'
import AppRoutes from './routes'
import { HelmetProvider } from 'react-helmet-async'

const App = (): JSX.Element => {
  return (
    <HelmetProvider>
        <AppRoutes />
    </HelmetProvider>
  )
}

export default App
