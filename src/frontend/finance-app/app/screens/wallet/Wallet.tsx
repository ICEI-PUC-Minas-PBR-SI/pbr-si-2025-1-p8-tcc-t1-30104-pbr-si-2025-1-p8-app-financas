import React, { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { WalletCard } from "../../components/wallet/WalletCard"
import { TransactionItem } from "../../components/wallet/TransactionItem"
import ChatButton from "../../components/chat/ChatButton"
import ChatModal from "../../components/chat/ChatModal"
import colors from "../../utils/colors"
import { getRequest } from "../../services/apiServices"
import { useAuth } from "../../context/AuthContext"
import { Transaction, TransactionSummary } from "../../utils/types"
import { useFocusEffect } from "@react-navigation/native"

export const Wallet: React.FC = () => {
  const { userId } = useAuth()

  const [chatVisible, setChatVisible] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useFocusEffect(
    React.useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const data: TransactionSummary = await getRequest(
            `transaction/summary/${userId}`,
          )

          const sortedTransactions = data.transactions.sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split("/").map(Number)
            const [dayB, monthB, yearB] = b.date.split("/").map(Number)

            const dateA = new Date(yearA, monthA - 1, dayA)
            const dateB = new Date(yearB, monthB - 1, dayB)

            if (dateB.getTime() !== dateA.getTime()) {
              return dateB.getTime() - dateA.getTime()
            }

            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })

          setTransactions(sortedTransactions)
        } catch (error) {
          console.error("Erro ao buscar transações:", error)
        }
      }

      fetchTransactions()

      return () => {}
    }, [userId]),
  )

  const income = transactions
    .filter(t => t.type == "entrada")
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter(t => t.type == "saida")
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expense

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestão no Bolso</Text>
      </View>

      <View style={styles.cardWrapper}>
        <WalletCard
          balance={balance}
          income={income}
          expense={Math.abs(expense)}
        />
      </View>

      <Text style={styles.historyTitle}>Histórico de Transações</Text>

      {transactions.length === 0 && (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 16, color: colors.gray }}>
            Nenhuma transação encontrada.
          </Text>
        </View>
      )}

      <ScrollView>
        {transactions.map((t, i) => (
          <TransactionItem
            key={i}
            title={t.title}
            date={t.date}
            value={t.amount}
            type={t.type}
            categoryName={t?.categoryName}
          />
        ))}
      </ScrollView>
      <ChatButton onPress={() => setChatVisible(true)} />
      <ChatModal visible={chatVisible} onClose={() => setChatVisible(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.primaryBackground,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
  },
  cardWrapper: {
    marginTop: 100,
    zIndex: 1,
    paddingHorizontal: 16,
  },
  historyTitle: {
    fontSize: 18,
    marginLeft: 16,
    marginVertical: 8,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 45,
    marginLeft: 16,
  },
})

export default Wallet
