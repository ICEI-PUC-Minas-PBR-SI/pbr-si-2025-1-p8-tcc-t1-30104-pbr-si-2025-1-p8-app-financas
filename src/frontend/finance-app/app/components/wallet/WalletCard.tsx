import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
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
      <Text style={styles.balance}>R$ {balance.toFixed(2)}</Text>
      <View style={styles.row}>
        <View style={styles.columnLeft}>
          <View style={styles.iconRow}>
            <Icon name="arrow-up-circle" size={18} color={colors.greenLight} />
            <Text style={styles.label}> Entrada</Text>
          </View>
          <Text style={[styles.amount, { color: colors.greenLight }]}>
            R$ {income.toFixed(2)}
          </Text>
        </View>
        <View style={styles.columnRight}>
          <View style={styles.iconRow}>
            <Icon name="arrow-down-circle" size={18} color={colors.redLight} />
            <Text style={styles.label}> Saída</Text>
          </View>
          <Text style={[styles.amount, { color: colors.redLight }]}>
            R$ {expense.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondaryBackground,
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
    marginTop: 8,
  },
  column: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.white,
    fontSize: 14,
    marginLeft: 4,
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 4,
  },
  columnLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  columnRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
})
