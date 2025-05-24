import React, { useCallback, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import colors from "../../utils/colors"
import { FlatList } from "react-native"
import { FAB } from "react-native-paper"
import { InvestmentItem } from "../../components/investment/InvestmentItem"
import { Investment } from "../../utils/types"
import { deleteRequest, getRequest } from "../../services/apiServices"
import { useAuth } from "../../context/AuthContext"
import ConfirmModal from "../../components/modals/ConfirmModal"
import SuccessModal from "../../components/modals/SuccessModal"
import ErrorModal from "../../components/modals/ErrorModal"
import InvestmentDetailsModal from "../../components/investment/InvestmentDetailsModal"

export const Investments: React.FC = () => {
  const { userId } = useAuth()
  const [investments, setInvestments] = useState<Investment[]>([])
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorModalText, setErrorModalText] = useState("")
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [investmentToDelete, setInvestmentToDelete] =
    useState<Investment | null>(null)
  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null)
  const [detailsModalVisible, setDetailsModalVisible] = useState(false)
  const navigation = useNavigation()

  const handleCreateInvestment = () => {
    navigation.navigate("CreateInvestment" as never)
  }

  const fetchInvestments = async () => {
    try {
      const data: Investment[] = await getRequest(
        `investment/simulations/${userId}`,
      )
      setInvestments(data)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
    }
  }

  const handleConfirmToggle = async () => {
    if (!investmentToDelete) return
    await handleDeleteInvestment(investmentToDelete.id)
    setConfirmModalVisible(false)
    setInvestmentToDelete(null)
    fetchInvestments()
  }

  const handleDeleteInvestment = async (id: number) => {
    try {
      await deleteRequest<{ message: string }>(`investment/delete/${id}`)
      setSuccessModalVisible(true)
    } catch (error: any) {
      setErrorModalVisible(true)
      setErrorModalText(error?.message || "Erro ao deletar investimento")
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchInvestments()
    }, []),
  )

  const renderItem = ({ item }: { item: Investment }) => (
    <InvestmentItem
      title={item.title}
      date={item.date}
      amount={item.amount}
      onPress={() => {
        setSelectedInvestment(item)
        setDetailsModalVisible(true)
      }}
      onDelete={() => {
        setInvestmentToDelete(item)
        setConfirmModalVisible(true)
      }}
    />
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus investimentos</Text>
      </View>
      <View style={styles.contentContainer}>
        {investments.length === 0 ? (
          <Text style={styles.empty}>Nenhum investimento cadastrado.</Text>
        ) : (
          <FlatList
            data={investments}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
      <FAB
        icon="plus"
        label="Novo Investimento"
        color="#fff"
        style={styles.fabButton}
        onPress={handleCreateInvestment}
      />
      <ConfirmModal
        visible={confirmModalVisible}
        onCancel={() => {
          setConfirmModalVisible(false)
          setInvestmentToDelete(null)
        }}
        onConfirm={handleConfirmToggle}
        title="Excluir Investimento"
        message={`Deseja realmente excluir o investimento "${investmentToDelete?.title}"?`}
      />
      <SuccessModal
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        message="Investimento excluído com sucesso!"
      />
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        message={errorModalText}
      />
      <InvestmentDetailsModal
        visible={detailsModalVisible}
        investment={selectedInvestment}
        onClose={() => {
          setDetailsModalVisible(false)
          setSelectedInvestment(null)
        }}
      />
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
  },
  expensesContainer: {
    marginTop: 10,
  },
  expenseTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
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
    color: "red",
    fontWeight: "bold",
  },
  card: {
    marginBottom: 12,
  },
  amount: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#888",
  },
  fabButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: colors.primary,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    opacity: 0.99,
  },
  itemContainer: {
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
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  itemAmount: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 6,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
})

export default Investments
