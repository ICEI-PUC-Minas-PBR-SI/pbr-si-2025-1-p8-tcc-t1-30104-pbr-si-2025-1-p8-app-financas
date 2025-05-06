import React from 'react'
import Wallet from '../screens/Wallet'
import AddTransaction from '../screens/AddTransaction'
import MonthlySummary from '../screens/graphs/MonthlySummary'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { ProfileStack } from './authStack.routes'
import { WalletStack } from './authStack.routes'

const Tab = createMaterialBottomTabNavigator()

export const TabRoutes = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Carteira"
        component={WalletStack}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="wallet-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen name="Investimentos" component={Wallet} shifting={true} />
      <Tab.Screen
        name="Transação"
        component={AddTransaction}
        shifting={true}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="cash-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Graficos"
        component={MonthlySummary}
        shifting={true}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="bar-chart-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        shifting={true}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="person-outline" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabRoutes
