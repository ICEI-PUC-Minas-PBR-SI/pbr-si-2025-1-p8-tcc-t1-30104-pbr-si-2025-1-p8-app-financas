import React from "react"
import { View, Text, StyleSheet } from "react-native"

const OverviewItem = ({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) => (
  <View style={styles.overviewItem}>
    <View style={[styles.circle, { backgroundColor: color }]} />
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, { color }]}>
      R$ {value !== "0" ? Number(value).toFixed(2) : "00,00"}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  overviewItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  label: {
    flex: 1,
    fontSize: 14,
  },
  value: {
    fontWeight: "bold",
  },
})

export default OverviewItem
