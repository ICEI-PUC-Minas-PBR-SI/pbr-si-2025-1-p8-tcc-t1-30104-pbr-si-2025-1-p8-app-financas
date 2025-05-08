import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Header } from '../../components/Header'
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { useAuth } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import { getRequest } from '../../services/apiServices'
import colors from '../../utils/colors'

const screenWidth = Dimensions.get('window').width

export const MonthlySummary = () => {
  const { userId } = useAuth()
  const [info, setInfo] = useState<
    { totalIncome?: string; totalExpense?: string } | undefined
  >(undefined)

  useFocusEffect(
    React.useCallback(() => {
      const fetchTransactions = async () => {
        try {
          const data: any = await getRequest(`graphs/summary/${userId}`)
          setInfo(data)
        } catch (error) {
          console.error('Erro ao buscar transações:', error)
        }
      }

      fetchTransactions()

      return () => {}
    }, [userId]),
  )

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
      <View style={styles.header}>
        <Text style={styles.title}>Resumo Mensal</Text>
      </View>

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
          <Text style={styles.valueGreen}>
            R$ {info?.totalIncome != '0' ? info?.totalIncome : '00,00'}
          </Text>
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
          <Text style={styles.valueRed}>
            R$ {info?.totalExpense != '0' ? info?.totalExpense : '00,00'}
          </Text>
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.primaryBackground,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
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
