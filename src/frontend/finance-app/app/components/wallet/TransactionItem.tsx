import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface TransactionItemProps {
  title: string
  date: string
  value: number
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  date,
  value,
}) => {
  const isIncome = value > 0

  return (
    <View style={styles.item}>
      <Text style={isIncome ? styles.incomeIcon : styles.expenseIcon}>
        {isIncome ? '🟢' : '🔴'}
      </Text>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={[styles.value, { color: isIncome ? 'green' : 'red' }]}>
        {isIncome ? `+ R$ ${value}` : `- R$ ${Math.abs(value)}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  incomeIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  expenseIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  value: {
    fontWeight: 'bold',
  },
})
