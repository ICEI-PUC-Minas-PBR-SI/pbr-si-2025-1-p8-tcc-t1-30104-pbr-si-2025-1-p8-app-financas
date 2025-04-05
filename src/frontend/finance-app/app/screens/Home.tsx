import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import ChatButton from '../components/Chat/ChatButton'
import ChatModal from '../components/Chat/chatModal'
import { useAuth } from '../context/AuthContext'

const HomeScreen: React.FC = () => {
  const [chatVisible, setChatVisible] = useState(false)
  const { onLogout, authState } = useAuth()

  const handleLogout = async () => {
    await onLogout!()
    alert('Você foi desconectado!')
  }

  return (
    <View style={styles.container}>
      <Button title="Sair" onPress={handleLogout} />
      <Text style={styles.title}>Bem-vindo ao App Financeiro</Text>

      <ChatButton onPress={() => setChatVisible(true)} />
      <ChatModal visible={chatVisible} onClose={() => setChatVisible(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default HomeScreen
