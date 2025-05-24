import React, { useRef } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Animated, Dimensions } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useFocusEffect } from "@react-navigation/native"
import Wallet from "../screens/wallet/Wallet"
import AddTransaction from "../screens/transactions/AddTransaction"
import MonthlySummary from "../screens/graphs/MonthlySummary"
import { InvestmentStack, ProfileStack } from "./authStack.routes"
import StatisticsScreen from "../screens/graphs/Statistics"
import Investments from "../screens/investment/Home"
const { width } = Dimensions.get("window")

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
      screenOptions={({ route }: { route: { name: string } }) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 9,
        },
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName = ""

          switch (route.name) {
            case "Carteira":
              iconName = "wallet-outline"
              break
            case "Transação":
              iconName = "cash-outline"
              break
            case "Gráfico":
              iconName = "pie-chart-outline"
              break
            case "Estatísticas":
              iconName = "stats-chart-outline"
              break
            case "Investir":
              iconName = "trending-up-outline"
              break
            case "Perfil":
              iconName = "person-outline"
              break
            default:
              iconName = "help-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#007aff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Carteira"
        component={withSlideFade(Wallet)}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Transação"
        component={withSlideFade(AddTransaction)}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Gráfico"
        component={withSlideFade(MonthlySummary)}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Estatísticas"
        component={withSlideFade(StatisticsScreen)}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Investir"
        component={withSlideFade(InvestmentStack)}
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
