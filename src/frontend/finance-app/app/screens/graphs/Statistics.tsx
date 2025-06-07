import React, { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { LineChart } from "react-native-chart-kit"
import colors from "../../utils/colors"
import { useAuth } from "../../context/AuthContext"
import { getRequest } from "../../services/apiServices"
import StatisticsItem from "../../components/statistics/StatisticsItem"
import { useFocusEffect } from "@react-navigation/native"

const screenWidth = Dimensions.get("window").width

const periodMap = {
  Dia: "day",
  Semanal: "week",
  Mensal: "month",
  Anual: "year",
}

export default function StatisticsScreen() {
  const { userId } = useAuth()
  const [period, setPeriod] = useState<"Dia" | "Semanal" | "Mensal" | "Anual">(
    "Anual",
  )
  const [category, setCategory] = useState<"expenses" | "income">("expenses")
  const [chartData, setChartData] = useState({ labels: [], values: [] })
  const [transactions, setTransactions] = useState([])

  useFocusEffect(
    useCallback(() => {
      fetchStatistics()
    }, [period, category]),
  )

  useEffect(() => {
    fetchStatistics()
  }, [period, category])

  const fetchStatistics = async () => {
    try {
      const mappedPeriod = periodMap[period]

      const data: any = await getRequest(
        `graphs/statistics/${userId}?period=${mappedPeriod}&category=${category}`,
      )

      const { chart, transactions } = data
      const values = chart.values.map((v: any) => Number(v))

      setChartData({ labels: chart.labels, values })
      setTransactions(transactions)
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error)
    }
  }

  const chartConfig = {
    backgroundGradientFrom: "#f0f0f0",
    backgroundGradientTo: "#f0f0f0",
    color: () => "#1A5D57",
    labelColor: () => "#000",
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: "#1A5D57",
    },
  }

  const periods = ["Dia", "Semanal", "Mensal", "Anual"]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estatísticas</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.tabs}>
          {periods.map(p => (
            <TouchableOpacity key={p} onPress={() => setPeriod(p as any)}>
              <Text style={[styles.tab, period === p && styles.activeTab]}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() =>
            setCategory(category === "expenses" ? "income" : "expenses")
          }
        >
          <Text style={styles.dropdownText}>
            {category === "expenses" ? "Despesas ▼" : "Receitas ▼"}
          </Text>
        </TouchableOpacity>
        {chartData.labels.length > 0 &&
        chartData.values.every(v => !isNaN(v)) ? (
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  data: chartData.values,
                  strokeWidth: 2,
                  color: () => "#1A5D57",
                },
              ],
            }}
            width={screenWidth * 0.9}
            height={350}
            chartConfig={chartConfig}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
            formatYLabel={yValue => `R$ ${yValue}`}
            yLabelsOffset={2}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              Nenhum dado disponível para o período selecionado.
            </Text>
          </View>
        )}

        <View style={styles.expensesContainer}>
          <Text style={styles.expenseTitle}>
            {category === "income" ? "Receitas" : "Despesas"} durante o período
          </Text>
          {transactions.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
              Nenhuma transação encontrada para este período.
            </Text>
          ) : (
            transactions
              .filter(tx => tx !== undefined && tx !== null)
              .map(tx => <StatisticsItem key={tx.id} transaction={tx} />)
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primaryBackground,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    padding: 16,
    backgroundColor: "#f1f1f1",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tab: {
    fontSize: 16,
    color: "#999",
  },
  activeTab: {
    color: "#1A5D57",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#1A5D57",
  },
  dropdown: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: "#555",
    marginTop: 15,
  },
  expensesContainer: {
    marginTop: 0,
  },
  expenseTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  noDataContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 8,
  },

  noDataText: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 20,
  },
})
