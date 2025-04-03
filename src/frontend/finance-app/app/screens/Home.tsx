import React from 'react'
import { View, Text, Button } from 'react-native'
import { useAuth } from '../context/AuthContext'

export default function LogoutScreen() {
  const { onLogout, authState } = useAuth()

  const handleLogout = async () => {
    await onLogout!()
    alert('Você foi desconectado!')
  }

  return (
    <View>
      <Text>Você está logado!</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  )
}
