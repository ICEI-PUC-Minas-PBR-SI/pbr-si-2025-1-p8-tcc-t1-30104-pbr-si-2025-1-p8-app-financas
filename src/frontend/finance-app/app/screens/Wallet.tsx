import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { WalletCard } from '../components/wallet/WalletCard'
import { TransactionItem } from '../components/wallet/TransactionItem'
import ChatButton from '../components/chat/ChatButton'
import ChatModal from '../components/chat/chatModal'
import colors from '../utils/colors'
import { getRequest } from '../services/apiServices'
import { useAuth } from '../context/AuthContext'
import { Transaction, TransactionSummary } from '../services/types'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

export const Wallet: React.FC = () => {
  const { userId } = useAuth()

  const [chatVisible, setChatVisible] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useFocusEffect(
    React.useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const data: TransactionSummary = await getRequest(
            `transaction/summary/${userId}`,
          )
          setTransactions(data.transactions)
        } catch (error) {
          console.error('Erro ao buscar transações:', error)
        }
      }

      fetchTransactions()

      return () => {}
    }, [userId]),
  )

  const income = transactions
    .filter(t => t.type == 'entrada')
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter(t => t.type == 'saida')
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expense

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu bolso</Text>
      </View>

      <View style={styles.cardWrapper}>
        <WalletCard
          balance={balance}
          income={income}
          expense={Math.abs(expense)}
        />
      </View>

      <Text style={styles.historyTitle}>Histórico</Text>
      <ScrollView>
        {transactions.map((t, i) => (
          <TransactionItem
            key={i}
            title={t.title}
            date={t.date}
            value={t.amount}
            type={t.type}
          />
        ))}
      </ScrollView>
      <ChatButton onPress={() => setChatVisible(true)} />
      <ChatModal visible={chatVisible} onClose={() => setChatVisible(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.primaryBackground,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
  },
  cardWrapper: {
    marginTop: 100,
    zIndex: 1,
    paddingHorizontal: 16,
  },
  historyTitle: {
    fontSize: 18,
    marginLeft: 16,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 16,
  },
})

export default Wallet
