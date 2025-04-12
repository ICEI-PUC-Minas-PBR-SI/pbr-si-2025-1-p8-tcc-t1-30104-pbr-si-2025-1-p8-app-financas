import React, { useState } from 'react'
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { sendMessageToAI } from '../../services/chatService'
import colors from '../../utils/colors'

interface ChatModalProps {
  visible: boolean
  onClose: () => void
}

const ChatModal: React.FC<ChatModalProps> = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! Como posso te ajudar?', sender: 'bot' },
  ])

  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    }
    setMessages(prev => [...prev, newMessage])

    setInputText('')
    setLoading(true)

    try {
      const response = await sendMessageToAI(inputText)
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), text: response, sender: 'bot' },
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Erro ao obter resposta da IA.',
          sender: 'bot',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
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
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBubble,
                  item.sender === 'user'
                    ? styles.userMessage
                    : styles.botMessage,
                ]}
              >
                <Text
                  style={[
                    item.sender === 'user'
                      ? styles.messageTextUser
                      : styles.messageTextBot,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
          />

          {loading && (
            <ActivityIndicator
              size="small"
              color="#000000"
              style={{ marginVertical: 10 }}
            />
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem..."
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 16,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: colors.backgroundChat,
    color: colors.black,
  },
  messageTextUser: {
    color: colors.white,
  },
  messageTextBot: {
    color: colors.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
})

export default ChatModal
