import React from "react"
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native"
import { LineChart } from "react-native-chart-kit"
import { Investment } from "../../utils/types"
import { formatNumberBR } from "../../utils/format"
import colors from "../../utils/colors"

interface InvestmentDetailsModalProps {
  visible: boolean
  onClose: () => void
  investment: Investment | null
}

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <View style={styles.item}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

const InfoItemFull: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <View style={styles.itemFull}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

const InvestmentDetailsModal: React.FC<InvestmentDetailsModalProps> = ({
  visible,
  onClose,
  investment,
}) => {
  if (!investment) return null

  const calculateGrowth = () => {
    const monthlyRate = investment.rateValue / 100 / 12
    let balance = investment.amount
    const data = [balance]

    for (let i = 1; i <= investment.months; i++) {
      balance += investment.monthlyContribution
      balance *= 1 + monthlyRate
      data.push(parseFloat(balance.toFixed(2)))
    }
    return data
  }

  const chartData = {
    labels: ["0", `${investment.months / 2}`, `${investment.months}`],
    datasets: [
      {
        data: calculateGrowth(),
        color: () => colors.primary,
        strokeWidth: 2,
      },
    ],
  }

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.title}>{investment.title}</Text>

            <View style={styles.row}>
              <InfoItem label="Tipo" value={investment.type.toUpperCase()} />
              <InfoItem label="Data" value={investment.date} />
              <InfoItem
                label="Valor Inicial"
                value={`R$ ${investment.amount.toFixed(2)}`}
              />
              <InfoItem
                label="Mensal"
                value={`R$ ${investment.monthlyContribution.toFixed(2)}`}
              />
              <InfoItem label="Prazo" value={`${investment.months} meses`} />
              <InfoItem label="Taxa Anual" value={`${investment.rateValue}%`} />
              <InfoItemFull
                label="Valor Total Projetado"
                value={`R$ ${investment.totalValue.toFixed(2)}`}
              />
            </View>

            <Text style={styles.chartLabel}>Crescimento projetado</Text>
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width * 0.85}
              height={220}
              yAxisLabel=""
              yLabelsOffset={12}
              withInnerLines={false}
              formatYLabel={value => `R$ ${formatNumberBR(Number(value))}`}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(26, 93, 87, ${opacity})`,
                labelColor: () => "#777",
                propsForLabels: {
                  fontSize: 11,
                },
                propsForBackgroundLines: {
                  stroke: "#eee",
                },
              }}
              bezier
              style={{
                marginVertical: 10,
                borderRadius: 8,
                alignSelf: "center",
              }}
            />

            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "96%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxHeight: "95%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "48%",
    marginBottom: 12,
  },
  itemFull: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
  },
  value: {
    fontSize: 14,
    color: "#555",
  },
  chartLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
})

export default InvestmentDetailsModal
