import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { formatDateBR, formatCurrency } from "../../utils/format"
import colors from "../../utils/colors"

interface TransactionItemProps {
  title: string
  date: string
  value: number
  categoryName?: string
  type: "entrada" | "saida"
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  date,
  value,
  type,
  categoryName,
}) => {
  const isIncome = type === "entrada"

  return (
    <View style={styles.item}>
      <Icon
        name={isIncome ? "arrow-up-circle" : "arrow-down-circle"}
        size={26}
        color={isIncome ? colors.greenLight : colors.error}
        style={styles.icon}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
          {categoryName}{" "}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text
        style={[
          styles.value,
          { color: isIncome ? colors.success : colors.error },
        ]}
      >
        {isIncome
          ? `+ R$ ${value.toFixed(2)}`
          : `- R$ ${Math.abs(value).toFixed(2)}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
  },
  value: {
    fontWeight: "bold",
    fontSize: 16,
  },
})
