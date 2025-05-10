import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import colors from "../../utils/colors"

interface ChatButtonProps {
  onPress: () => void
}

const ChatButton: React.FC<ChatButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.chatButton} onPress={onPress}>
      <Ionicons name="chatbubble-ellipses" size={28} color={colors.white} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  chatButton: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    opacity: 0.99,
  },
})

export default ChatButton
