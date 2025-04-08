import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { useAuth } from '../context/AuthContext'
import { Ionicons } from '@expo/vector-icons'

export const Profile = () => {
  const { onLogout, authState, userInfo } = useAuth()

  const handleLogout = async () => {
    await onLogout!()
  }

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="#006666" />
      <Text style={styles.title}>{userInfo?.name}</Text>

      <Button title="Sair" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006666',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default Profile
