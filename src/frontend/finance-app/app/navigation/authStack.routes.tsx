import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import EditProfile from '../screens/auth/EditProfile'
import Profile from '../screens/Profile'
import NewCategory from '../screens/NewCategory'

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
    </Stack.Navigator>
  )
}

export function CategoryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewCategory"
        component={NewCategory}
        options={{ title: 'Adicionar nova categoria' }}
      />
    </Stack.Navigator>
  )
}
