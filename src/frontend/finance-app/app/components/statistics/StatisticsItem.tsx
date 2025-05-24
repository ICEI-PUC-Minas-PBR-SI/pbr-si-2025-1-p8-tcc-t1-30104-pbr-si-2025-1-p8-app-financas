import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface Transaction {
  id: string
  type: "entrada" | "saida"
  categoryName: string
  date: string
  amount: number
}

interface Props {
  transaction: Transaction
}

export default function StatisticsItem({ transaction }: Props) {
  const { type, categoryName, date, amount } = transaction

  return (
    <View style={styles.expenseItem}>
      <Icon
        name={type === "entrada" ? "arrow-upward" : "arrow-downward"}
        size={24}
        color={type === "entrada" ? "green" : "red"}
      />
      <View style={styles.expenseInfo}>
        <Text style={styles.expenseLabel}>{categoryName}</Text>
        <Text style={styles.expenseDate}>{date}</Text>
      </View>
      <Text
        style={[
          styles.expenseAmount,
          { color: type === "entrada" ? "green" : "red" },
        ]}
      >
        {type === "entrada" ? "+ " : "- "}R$ {amount.toFixed(2)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  expenseInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  expenseLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  expenseDate: {
    fontSize: 12,
    color: "#777",
  },
  expenseAmount: {
    fontWeight: "bold",
  },
})
