import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import colors from "../../utils/colors"

interface Props {
  title: string
  date: string
  amount: number
  onPress?: () => void
  onDelete?: () => void
}

export const InvestmentItem: React.FC<Props> = ({
  title,
  date,
  amount,
  onPress,
  onDelete,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.info}>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.date}>Aplicado em: {date}</Text>
      <Text style={styles.amount}>R$ {amount.toFixed(2)}</Text>
    </View>

    {onDelete && (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    width: "100%",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 6,
  },
  deleteButton: {
    backgroundColor: colors.error,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
})
