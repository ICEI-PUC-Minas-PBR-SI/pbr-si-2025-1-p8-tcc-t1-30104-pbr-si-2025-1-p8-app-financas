import React, { useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Animated, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import Wallet from '../screens/Wallet'
import AddTransaction from '../screens/AddTransaction'
import MonthlySummary from '../screens/graphs/MonthlySummary'
import { ProfileStack, WalletStack } from './authStack.routes'
const { width } = Dimensions.get('window')

const Tab = createBottomTabNavigator()

const SlideFadeWrapper = ({ children }: { children: React.ReactNode }) => {
  const translateY = useRef(new Animated.Value(20)).current
  const opacity = useRef(new Animated.Value(0)).current

  useFocusEffect(
    React.useCallback(() => {
      translateY.setValue(20)
      opacity.setValue(0)

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start()
    }, [translateY, opacity]),
  )

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ translateY }],
        opacity,
      }}
    >
      {children}
    </Animated.View>
  )
}

const withSlideFade = (Component: React.ComponentType<any>) => (props: any) =>
  (
    <SlideFadeWrapper>
      <Component {...props} />
    </SlideFadeWrapper>
  )

export const TabRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = ''

          switch (route.name) {
            case 'Carteira':
              iconName = 'wallet-outline'
              break
            case 'Transação':
              iconName = 'cash-outline'
              break
            case 'Gráficos':
              iconName = 'bar-chart-outline'
              break
            case 'Perfil':
              iconName = 'person-outline'
              break
            default:
              iconName = 'help-outline'
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Carteira"
        component={withSlideFade(WalletStack)}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Transação"
        component={withSlideFade(AddTransaction)}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Gráficos"
        component={withSlideFade(MonthlySummary)}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Perfil"
        component={withSlideFade(ProfileStack)}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  )
}

export default TabRoutes
