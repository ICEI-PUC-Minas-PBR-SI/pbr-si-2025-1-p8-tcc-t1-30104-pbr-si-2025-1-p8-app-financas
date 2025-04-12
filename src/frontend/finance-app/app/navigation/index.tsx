import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabRoutes from './tab.routes'
import StackRoutes from './stack.routes'

const Stack = createNativeStackNavigator()
export default function Routes() {
  const { authState, userId, userInfo } = useAuth()
  return (
    <NavigationContainer>
      {authState?.authenticated ? <TabRoutes /> : <StackRoutes />}
    </NavigationContainer>
  )
}
