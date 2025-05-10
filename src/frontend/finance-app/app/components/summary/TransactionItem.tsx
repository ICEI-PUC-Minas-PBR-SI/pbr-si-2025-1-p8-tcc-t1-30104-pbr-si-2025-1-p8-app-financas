import React from "react"
import { View, Text, StyleSheet } from "react-native"

const TransactionItem = ({
  categoryId,
  categoryName,
  type,
  amount,
  date,
}: {
  categoryId: string
  categoryName: string
  type: string
  amount: string
  date: string
}) => (
  <View style={styles.transactionItem} key={categoryId}>
    <View style={styles.accountText}>
      <Text style={styles.label}>{categoryName}</Text>
      <Text style={styles.subtext}>Última transação: {date}</Text>
    </View>
    <Text
      style={[
        type === "entrada" ? styles.valueGreen : styles.valueRed,
        styles.transactionValue,
      ]}
    >
      {type === "entrada" ? "+" : "-"} R$ {Number(amount).toFixed(2)}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  accountText: {
    flex: 1,
  },
  label: {
    fontSize: 14,
  },
  subtext: {
    fontSize: 12,
    color: "#666",
  },
  transactionValue: {
    textAlign: "right",
    flex: 0.4,
  },
  valueGreen: {
    color: "#4CAF50",
  },
  valueRed: {
    color: "#f44336",
  },
})

export default TransactionItem
