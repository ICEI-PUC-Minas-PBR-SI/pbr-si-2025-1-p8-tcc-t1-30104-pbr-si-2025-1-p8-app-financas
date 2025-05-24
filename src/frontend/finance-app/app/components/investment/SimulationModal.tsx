import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput as RNTextInput,
} from "react-native"
import colors from "../../utils/colors"

interface SimulationData {
  amount: number
  monthlyContribution: number
  months: number
  rateValue: number
  totalValue: number
  type: string
}

interface SimulationModalProps {
  visible: boolean
  simulationData: SimulationData | null
  onClose: () => void
  onSave: (title: string) => void
}

const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

const formatPercent = (value: number) => {
  return `${value.toFixed(2)}%`
}

const SimulationModal: React.FC<SimulationModalProps> = ({
  visible,
  simulationData,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("")

  const handleSave = () => {
    onSave(title.trim())
    setTitle("")
  }

  if (!simulationData) return null

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.infoText}>
            Caso queira salvar sua simulação, digite um título e clique no botão
            Salvar
          </Text>

          <RNTextInput
            placeholder="Digite um título para a simulação"
            value={title}
            onChangeText={setTitle}
            style={styles.modalInput}
          />
          <View style={styles.highlightBlock}>
            <Text style={styles.highlightLabel}>Rentabilidade Estimada</Text>
            <Text style={styles.highlightValue}>
              {formatPercent(simulationData.rateValue)}
            </Text>
          </View>

          <View style={styles.highlightBlock}>
            <Text style={styles.highlightLabel}>Valor Final Bruto</Text>
            <Text style={styles.highlightValue}>
              {formatCurrency(simulationData.totalValue)}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>Tipo</Text>
            <Text style={styles.valueSecondary}>
              {simulationData.type.toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Meses</Text>
            <Text style={styles.valueSecondary}>{simulationData.months}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Valor inicial</Text>
            <Text style={styles.valueSecondary}>
              {formatCurrency(simulationData.amount)}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>Aporte mensal</Text>
            <Text style={styles.valueSecondary}>
              {formatCurrency(simulationData.monthlyContribution)}
            </Text>
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setTitle("")
                onClose()
              }}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.saveButton,
                !title.trim() && styles.disabledButton,
              ]}
              onPress={handleSave}
              disabled={!title.trim()}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  infoText: {
    marginVertical: 10,
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    fontWeight: "bold",
  },
  infoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
  valueSecondary: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.black,
  },
  highlightBlock: {
    backgroundColor: "#e0f7f7",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: colors.primaryBackground,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 8,
  },
  highlightLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryBackground,
    marginBottom: 6,
  },
  highlightValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.success,
  },
  modalInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: colors.error,
  },
  saveButton: {
    backgroundColor: colors.primaryBackground,
  },
  disabledButton: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#fff",
  },
})

export default SimulationModal
