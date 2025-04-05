import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface ChatButtonProps {
  onPress: () => void
}

const ChatButton: React.FC<ChatButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.chatButton} onPress={onPress}>
      <Ionicons name="chatbubble-ellipses" size={28} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
})

export default ChatButton
