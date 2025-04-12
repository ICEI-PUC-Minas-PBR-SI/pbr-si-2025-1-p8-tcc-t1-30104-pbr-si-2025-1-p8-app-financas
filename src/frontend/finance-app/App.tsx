import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { AuthProvider } from './app/context/AuthContext'
import Routes from './app/navigation/index'

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </AuthProvider>
  )
}
