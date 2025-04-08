import React from 'react'
import Wallet from '../screens/Wallet'
import NewCategory from '../screens/NewCategory'
import AddTransaction from '../screens/AddTransaction'
import MonthlySummary from '../screens/graphs/MonthlySummary'
import Profile from '../screens/Profile'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator()

const Placeholder = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{title}</Text>
  </View>
)

export const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#006666',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Carteira"
        component={Wallet}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="wallet-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen name="Investimentos" component={Wallet} shifting={true} />
      <Tab.Screen name="Transação" component={Wallet} shifting={true} />
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
        name="Perfil"
        component={Profile}
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

export default AppTabs
