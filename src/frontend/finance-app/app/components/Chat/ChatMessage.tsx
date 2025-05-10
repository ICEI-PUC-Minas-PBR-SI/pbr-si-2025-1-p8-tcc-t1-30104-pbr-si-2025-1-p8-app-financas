import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import colors from "../../utils/colors"

interface ChatMessageProps {
  text: string
  sender: "user" | "bot"
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  return (
    <View
      style={[
        styles.messageRow,
        sender === "user" ? styles.userRow : styles.botRow,
      ]}
    >
      {sender === "bot" && (
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="robot" size={20} color={colors.white} />
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          sender === "user" ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text
          style={
            sender === "user" ? styles.messageTextUser : styles.messageTextBot
          }
        >
          {text}
        </Text>
      </View>

      {sender === "user" && (
        <View style={styles.avatarUser}>
          <Ionicons name="person" size={20} color={colors.white} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  userRow: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  botRow: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  avatarUser: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
    marginBottom: 5,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: colors.backgroundChat,
  },
  messageTextUser: {
    color: colors.white,
  },
  messageTextBot: {
    color: colors.black,
  },
})

export default ChatMessage
