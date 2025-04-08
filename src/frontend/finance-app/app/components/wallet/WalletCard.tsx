import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface WalletCardProps {
  balance: number
  income: number
  expense: number
}

export const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  income,
  expense,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bolso</Text>
      <Text style={styles.balance}>R$ {balance}</Text>
      <View style={styles.row}>
        <Text style={styles.income}>↑ Entrada R$ {income}</Text>
        <Text style={styles.expense}>↓ Saída R$ {expense}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#006666',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  balance: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  income: {
    color: 'lightgreen',
    fontWeight: 'bold',
  },
  expense: {
    color: '#f77',
    fontWeight: 'bold',
  },
})
