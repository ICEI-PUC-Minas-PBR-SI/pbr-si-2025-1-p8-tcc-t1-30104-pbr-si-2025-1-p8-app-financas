import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthProvider, useAuth } from './app/context/AuthContext'
import Login from './app/screens/auth/Login'
import Register from './app/screens/auth/Register'
import AppTabs from './app/navigation/AppTabs'
import { PaperProvider } from 'react-native-paper'
import { enableScreens } from 'react-native-screens'
import 'react-native-gesture-handler'

enableScreens()

const Stack = createNativeStackNavigator()

const Layout = () => {
  const { authState } = useAuth()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
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
      <PaperProvider>
        <Layout />
      </PaperProvider>
    </AuthProvider>
  )
}
