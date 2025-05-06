import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Categories } from '../screens/Categories'
import EditProfile from '../screens/auth/EditProfile'
import Profile from '../screens/Profile'
import AddTransaction from '../screens/AddTransaction'
import { Wallet } from '../screens/Wallet'

const Stack = createNativeStackNavigator()

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName={'Profile'}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: 'Editar Perfil' }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ title: 'Categorias' }}
      />
    </Stack.Navigator>
  )
}

export function WalletStack() {
  return (
    <Stack.Navigator initialRouteName={'Wallet'}>
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{ title: 'Adicionar transação' }}
      />
    </Stack.Navigator>
  )
}
