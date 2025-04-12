import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Header } from '../../components/Header'
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

export const MonthlySummary = () => {
  const data = [
    {
      name: 'Receitas',
      amount: 7400,
      color: '#4CAF50',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Despesas',
      amount: 2045,
      color: '#f44336',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ]

  return (
    <View style={{ flex: 1 }}>
      <Header title="Resumo Mensal" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Visão geral</Text>
        <View style={styles.overviewItem}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#4CAF50',
            }}
          />
          <Text style={styles.label}>Receitas</Text>
          <Text style={styles.valueGreen}>R$15.400,00</Text>
        </View>
        <View style={styles.overviewItem}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#f44336',
            }}
          />
          <Text style={styles.label}>Despesas</Text>
          <Text style={styles.valueRed}>R$5.883,50</Text>
        </View>
        <View style={styles.overviewItem}>
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#006666',
            }}
          />
          <Text style={styles.label}>Cartões de crédito</Text>
          <Text style={styles.valueRed}>R$600,00</Text>
        </View>

        <Text style={styles.sectionTitle}>Resumo</Text>
        <PieChart
          data={data}
          width={screenWidth - 32}
          height={160}
          chartConfig={{
            color: () => `#000`,
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
          }}
          accessor={'amount'}
          backgroundColor={'transparent'}
          paddingLeft={'0'}
          center={[0, 0]}
          absolute
        />
        <View style={styles.summaryText}>
          <Text style={styles.income}>Receitas: 7.400,00 R$</Text>
          <Text style={styles.expense}>Despesas: -2.045,00 R$</Text>
          <Text style={styles.total}>Total: 5.355,00 R$</Text>
        </View>

        <Text style={styles.sectionTitle}>Contas</Text>
        <View style={styles.accountItem}>
          <View style={styles.accountText}>
            <Text style={styles.label}>Carteira</Text>
            <Text style={styles.subtext}>Última utilização: 16/05/2018</Text>
          </View>
          <Text style={styles.valueGreen}>6.610,00 R$</Text>
        </View>
        <View style={styles.accountItem}>
          <View style={styles.accountText}>
            <Text style={styles.label}>Conta Poupança</Text>
            <Text style={styles.subtext}>Data de criação: 05/04/2018</Text>
          </View>
          <Text style={styles.valueRed}>-542,00 R$</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  label: {
    flex: 1,
    fontSize: 14,
  },
  valueGreen: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  valueRed: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  summaryText: {
    marginTop: 12,
    gap: 4,
  },
  income: {
    color: '#4CAF50',
  },
  expense: {
    color: '#f44336',
  },
  total: {
    fontWeight: 'bold',
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  accountText: {
    flex: 1,
  },
  subtext: {
    fontSize: 12,
    color: '#666',
  },
})
export default MonthlySummary
