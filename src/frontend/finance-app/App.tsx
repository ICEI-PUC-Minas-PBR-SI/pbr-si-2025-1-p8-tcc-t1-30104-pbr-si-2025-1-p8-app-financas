import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthProvider, useAuth } from './app/context/AuthContext'
import Login from './app/screens/auth/Login'
import Register from './app/screens/auth/Register'
import Home from './app/screens/Home'

const Stack = createNativeStackNavigator()

const Layout = () => {
  const { authState } = useAuth()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: 'Cadastrar' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  )
}
