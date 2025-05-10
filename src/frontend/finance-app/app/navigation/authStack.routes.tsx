import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Categories } from '../screens/Categories'
import EditProfile from '../screens/auth/EditProfile'
import DeleteProfile from '../screens/auth/DeleteProfile'
import Profile from '../screens/Profile'
import AddTransaction from '../screens/AddTransaction'
import HelpScreen from '../screens/HelpScreen'
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
      <Stack.Screen
        name="deleteProfile"
        component={DeleteProfile}
        options={{ title: 'Deletar Conta' }}
      />
      <Stack.Screen
        name="helpScreen"
        component={HelpScreen}
        options={{ title: 'Ajuda' }}
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
