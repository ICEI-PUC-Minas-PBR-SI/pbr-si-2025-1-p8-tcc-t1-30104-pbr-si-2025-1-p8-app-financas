import React, { useState } from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { useAuth } from "../../context/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { deleteRequest } from "../../services/apiServices"
import CustomButton from "../../components/formik/CustomButton"
import SuccessModal from "../../components/modals/SuccessModal"
import ErrorModal from "../../components/modals/ErrorModal"
import colors from "../../utils/colors"
import ConfirmModal from "../../components/modals/ConfirmModal"

export default function DeleteAccount() {
  const { userId, onLogout } = useAuth()
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [errorModalText, setErrorModalText] = useState("")
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const navigation = useNavigation()

  const handleDeleteAccount = async () => {
    try {
      await deleteRequest<{ message: string }>(`users/deleteuser/${userId}`)
      setSuccessModalVisible(true)
    } catch (error) {
      setErrorModalVisible(true)
      setErrorModalText(error.message || "Erro ao deletar conta")
    }
  }

  const handleConfirmDelete = () => {
    handleDeleteAccount()
    setConfirmModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar Conta</Text>
      <Text style={styles.warningText}>
        Ao deletar sua conta, todos os dados serão perdidos permanentemente.
      </Text>
      <CustomButton
        title="Deletar Conta"
        onPress={() => setConfirmModalVisible(true)}
        style={styles.deleteButton}
      />

      <SuccessModal
        visible={successModalVisible}
        message="Conta deletada com sucesso! Você será deslogado."
        onClose={() => {
          setSuccessModalVisible(false)
          onLogout?.()
        }}
      />
      <ErrorModal
        visible={errorModalVisible}
        message={errorModalText}
        onClose={() => {
          setErrorModalVisible(false)
        }}
      />

      <ConfirmModal
        visible={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmDelete}
        title="Deletar Conta"
        message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.defaultText,
    marginBottom: 30,
  },
  warningText: {
    fontSize: 16,
    color: colors.error,
    marginBottom: 20,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
})
