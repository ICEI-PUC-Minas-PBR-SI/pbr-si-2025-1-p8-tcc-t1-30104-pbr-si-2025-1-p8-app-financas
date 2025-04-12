import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { WalletCard } from '../components/wallet/WalletCard'
import { TransactionItem } from '../components/wallet/TransactionItem'
import ChatButton from '../components/chat/ChatButton'
import ChatModal from '../components/chat/chatModal'
import colors from '../utils/colors'

export const Wallet: React.FC = () => {
  const [chatVisible, setChatVisible] = useState(false)

  const transactions = [
    { title: 'Salário (Fixo)', date: 'Sexta-feira 28/4/2023', value: 1500 },
    { title: 'Casa (Sabonete)', date: 'Sexta-feira 28/4/2023', value: -4 },
    { title: 'Casa (Detergente)', date: 'Sexta-feira 28/4/2023', value: -12 },
    {
      title: 'Transporte (Passagem de avião)',
      date: 'Quarta-feira 19/4/2023',
      value: -480,
    },
    {
      title: 'Investimentos (Fundo imobiliário)',
      date: 'Sábado 22/4/2023',
      value: -600,
    },
  ]

  const income = transactions
    .filter(t => t.value > 0)
    .reduce((acc, t) => acc + t.value, 0)
  const expense = transactions
    .filter(t => t.value < 0)
    .reduce((acc, t) => acc + t.value, 0)
  const balance = income + expense

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu bolso</Text>
      </View>
      <WalletCard
        balance={balance}
        income={income}
        expense={Math.abs(expense)}
      />
      <Text style={styles.historyTitle}>Histórico</Text>
      <ScrollView>
        {transactions.map((t, i) => (
          <TransactionItem
            key={i}
            title={t.title}
            date={t.date}
            value={t.value}
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
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 18,
    marginLeft: 16,
    marginVertical: 8,
    fontWeight: 'bold',
  },
})

export default Wallet
