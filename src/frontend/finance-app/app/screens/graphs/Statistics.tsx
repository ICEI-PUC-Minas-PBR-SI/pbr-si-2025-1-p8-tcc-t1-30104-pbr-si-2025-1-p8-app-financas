import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { LineChart } from "react-native-chart-kit"
import Icon from "react-native-vector-icons/MaterialIcons"
import colors from "../../utils/colors"

const screenWidth = Dimensions.get("window").width

export default function StatisticsScreen() {
  const data = {
    labels: ["19", "20", "21", "22", "23", "24"],
    datasets: [
      {
        data: [700, 900, 1150, 1000, 800, 600],
        strokeWidth: 2,
        color: () => "#1A5D57",
      },
    ],
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estatísticas</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.tabs}>
          <Text style={styles.tab}>Day</Text>
          <Text style={styles.tab}>Week</Text>
          <Text style={[styles.tab, styles.activeTab]}>Month</Text>
        </View>

        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Expenses ▼</Text>
        </View>

        <LineChart
          data={data}
          width={screenWidth - 32}
          height={300}
          chartConfig={chartConfig}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />

        <View style={styles.expensesContainer}>
          <Text style={styles.expenseTitle}>Expenses during the period</Text>

          <View style={styles.expenseItem}>
            <Icon name="arrow-downward" size={24} color="red" />
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseLabel}>Transport (Plane ticket)</Text>
              <Text style={styles.expenseDate}>Wednesday 4/19/2023</Text>
            </View>
            <Text style={styles.expenseAmount}>- R$ 480</Text>
          </View>

          <View style={styles.expenseItem}>
            <Icon name="arrow-downward" size={24} color="red" />
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseLabel}>
                Investments (Real estate fund)
              </Text>
              <Text style={styles.expenseDate}>Saturday 4/22/2023</Text>
            </View>
            <Text style={styles.expenseAmount}>- R$ 600</Text>
          </View>
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
})
