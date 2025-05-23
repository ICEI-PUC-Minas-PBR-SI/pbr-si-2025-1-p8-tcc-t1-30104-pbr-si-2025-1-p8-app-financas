import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../screens/auth/Login"
import Register from "../screens/auth/Register"

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Crie sua Conta" }}
      />
    </Stack.Navigator>
  )
}
