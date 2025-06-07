import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from "react-native"

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { MessageItem } from "../../utils/types"
import { sendMessageToAI } from "../../services/chatService"
import colors from "../../utils/colors"

interface ChatModalProps {
  visible: boolean
  onClose: () => void
}

const predefinedQuestions = [
  "Sou iniciante e quero começar a investir",
  "Dicas de investimento",
]

const ChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
  const flatListRef = useRef<FlatList>(null)

  const [messages, setMessages] = useState([
    { id: "1", text: "Olá! Como posso te ajudar?", sender: "bot" },
  ])
  const [inputText, setInputText] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (visible) {
      scrollToEnd()
    }
  }, [visible, messages])

  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true })
  }

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return

    const userMessage = createMessage(textToSend, "user")
    setMessages(prev => [...prev, userMessage])
    setInputText("")
    Keyboard.dismiss()
    setLoading(true)

    try {
      const response = await sendMessageToAI(textToSend)
      const botMessage = createMessage(response, "bot")
      setMessages(prev => [...prev, botMessage])
      setTimeout(scrollToEnd, 100)
      setLoading(false)
    } catch (error) {
      const errorMessage = createMessage(
        "Erro ao obter resposta do Assistente.",
        "bot",
      )
      setMessages(prev => [...prev, errorMessage])
      setTimeout(scrollToEnd, 100)
    }
  }

  const createMessage = (text: string, sender: "user" | "bot") => ({
    id: Date.now().toString(),
    text,
    sender,
  })

  const renderMessageItem = ({ item }: { item: MessageItem }) => {
    const isUser = item.sender === "user"
    return (
      <View
        style={[styles.messageRow, isUser ? styles.userRow : styles.botRow]}
      >
        {!isUser && renderAvatar("bot")}

        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userMessage : styles.botMessage,
          ]}
        >
          <Text style={isUser ? styles.messageTextUser : styles.messageTextBot}>
            {item.text}
          </Text>
        </View>

        {isUser && renderAvatar("user")}
      </View>
    )
  }

  const renderAvatar = (sender: string) => {
    if (sender === "user") {
      return (
        <View style={styles.avatarUser}>
          <Ionicons name="person" size={20} color={colors.white} />
        </View>
      )
    }
    return (
      <View style={styles.avatar}>
        <MaterialCommunityIcons name="robot" size={20} color={colors.white} />
      </View>
    )
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Converse com seu Assistente Financeiro
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={renderMessageItem}
            onContentSizeChange={scrollToEnd}
          />

          {!messages.some(msg => msg.sender === "user") && (
            <View style={styles.faqContainer}>
              {predefinedQuestions.map((question, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.faqButton}
                  onPress={() => sendMessage(question)}
                >
                  <Text style={styles.faqButtonText}>{question}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {loading && (
            <ActivityIndicator
              size="small"
              color="#000"
              style={styles.loader}
            />
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem..."
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity
              onPress={() => sendMessage(inputText)}
              style={styles.sendButton}
            >
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
    maxHeight: "65%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
  },
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
  avatarUser: {
    width: 32,
    height: 32,
    marginBottom: 5,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  avatar: {
    width: 32,
    height: 32,
    marginBottom: 5,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  faqContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  faqButton: {
    backgroundColor: colors.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  faqButtonText: {
    color: colors.primary,
    fontSize: 14,
  },
  loader: {
    marginVertical: 10,
  },
})

export default ChatModal
