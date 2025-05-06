import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { formatDateBR } from '../../utils/format'
import colors from '../../utils/colors'

interface TransactionItemProps {
  title: string
  date: string
  value: number
  type: 'entrada' | 'saida'
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  date,
  value,
  type,
}) => {
  const isIncome = type === 'entrada'

  return (
    <View style={styles.item}>
      <Icon
        name={isIncome ? 'arrow-up-circle' : 'arrow-down-circle'}
        size={26}
        color={isIncome ? colors.greenLight : 'red'}
        style={styles.icon}
      />
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
  icon: {
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})
