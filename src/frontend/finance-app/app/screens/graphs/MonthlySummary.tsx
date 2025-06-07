import React, { useState, useCallback } from "react"
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { useAuth } from "../../context/AuthContext"
import { useFocusEffect } from "@react-navigation/native"
import { getRequest } from "../../services/apiServices"
import { PieChart } from "react-native-chart-kit"
import OverviewItem from "../../components/summary/OverviewItem"
import TransactionItem from "../../components/summary/TransactionItem"
import colors from "../../utils/colors"

const screenWidth = Dimensions.get("window").width

const chartConfig = {
  width: screenWidth - 32,
  height: 160,
  chartConfig: {
    color: () => "#000",
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
  },
  accessor: "amount",
  backgroundColor: "transparent",
  paddingLeft: "0",
  center: [0, 0],
}

const MonthlySummary = () => {
  const { userId } = useAuth()
  const [info, setInfo] = useState<
    | {
        totalIncome?: string
        totalExpense?: string
        incomeByCategory?: Record<string, any>
        expenseByCategory?: Record<string, any>
      }
    | undefined
  >(undefined)

  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const data: any = await getRequest(`graphs/summary/${userId}`)
          setInfo(data)
        } catch (error) {
          console.error("Erro ao buscar transações:", error)
        }
      }

      fetchTransactions()
    }, [userId]),
  )

  const chartData = [
    {
      name: "Receitas",
      amount: info?.totalIncome ? Number(info.totalIncome) : 0,
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
    {
      name: "Despesas",
      amount: info?.totalExpense ? Number(info.totalExpense) : 0,
      color: "#f44336",
      legendFontColor: "#333",
      legendFontSize: 14,
    },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resumo Mensal</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {Number(info?.totalIncome || 0) > 0 ||
        Number(info?.totalExpense || 0) > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Visão geral</Text>
            <OverviewItem
              label="Receitas"
              value={info?.totalIncome || "0"}
              color="#4CAF50"
            />
            <OverviewItem
              label="Despesas"
              value={info?.totalExpense || "0"}
              color="#f44336"
            />

            <Text style={styles.sectionTitle}>Resumo</Text>
            <PieChart data={chartData} {...chartConfig} />
            <View style={styles.summaryText}>
              <Text style={styles.income}>
                Receitas: R$ {Number(info?.totalIncome || 0).toFixed(2)}
              </Text>
              <Text style={styles.expense}>
                Despesas: R$ {Number(info?.totalExpense || 0).toFixed(2)}
              </Text>
              <Text style={styles.total}>
                Total: R${" "}
                {(
                  Number(info?.totalIncome || 0) -
                  Number(info?.totalExpense || 0)
                ).toFixed(2)}{" "}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Últimas Transações</Text>
            {info?.incomeByCategory &&
              Object.entries(info.incomeByCategory).map(
                ([categoryId, categoryData]) => (
                  <TransactionItem
                    key={categoryId}
                    categoryId={categoryId}
                    categoryName={categoryData.name}
                    type="entrada"
                    amount={categoryData.lastTransaction?.amount || "0"}
                    date={categoryData.lastTransaction?.date || "N/A"}
                  />
                ),
              )}

            {info?.expenseByCategory &&
              Object.entries(info.expenseByCategory).map(
                ([categoryId, categoryData]) => (
                  <TransactionItem
                    key={categoryId}
                    categoryId={categoryId}
                    categoryName={categoryData.name}
                    type="saida"
                    amount={categoryData.lastTransaction?.amount || "0"}
                    date={categoryData.lastTransaction?.date || "N/A"}
                  />
                ),
              )}
          </>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              Você ainda não teve movimentações esse mês.
            </Text>
          </View>
        )}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  summaryText: {
    marginTop: 12,
    gap: 4,
  },
  income: {
    color: "#4CAF50",
  },
  expense: {
    color: "#f44336",
  },
  total: {
    fontWeight: "bold",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  noDataText: {
    fontSize: 16,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
  },
})

export default MonthlySummary
