import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Categories } from "../screens/profile/Categories"
import EditProfile from "../screens/auth/EditProfile"
import DeleteProfile from "../screens/auth/DeleteProfile"
import Profile from "../screens/profile/Profile"
import Investments from "../screens/investment/Home"
import CreateInvestment from "../screens/investment/CreateInvestment"
import HelpScreen from "../screens/profile/HelpScreen"

const Stack = createNativeStackNavigator()

export function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName={"Profile"}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "Editar Perfil" }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ title: "Categorias" }}
      />
      <Stack.Screen
        name="deleteProfile"
        component={DeleteProfile}
        options={{ title: "Deletar Conta" }}
      />
      <Stack.Screen
        name="helpScreen"
        component={HelpScreen}
        options={{ title: "Ajuda" }}
      />
    </Stack.Navigator>
  )
}
export function InvestmentStack() {
  return (
    <Stack.Navigator initialRouteName={"Investment"}>
      <Stack.Screen
        name="Investment"
        component={Investments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateInvestment"
        component={CreateInvestment}
        options={{ title: "Novo Investimento" }}
      />
    </Stack.Navigator>
  )
}
