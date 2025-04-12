import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import colors from '../../utils/colors'

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
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 4,
  },
  title: {
    color: colors.white,
    fontSize: 18,
  },
  balance: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  income: {
    color: colors.greenLight,
    fontWeight: 'bold',
  },
  expense: {
    color: colors.redLight,
    fontWeight: 'bold',
  },
})
