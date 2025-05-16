import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native"
import { useAuth } from "../../context/AuthContext"
import { Ionicons } from "@expo/vector-icons"
import colors from "../../utils/colors"
import { useNavigation } from "@react-navigation/native"

const options = [
  { id: "0", icon: "person-outline", label: "Categorias" },
  { id: "1", icon: "create-outline", label: "Editar Perfil" },
  { id: "2", icon: "settings-outline", label: "Configurações" },
  { id: "3", icon: "help-circle-outline", label: "Ajuda" },
  { id: "4", icon: "trash", label: "Deletar Conta" },
  { id: "5", icon: "log-out-outline", label: "Sair" },
]

export const Profile = () => {
  const navigation = useNavigation()
  const { onLogout, userInfo } = useAuth()

  const handleOptionPress = (label: string) => {
    switch (label) {
      case "Sair":
        onLogout?.()
        break

      case "Categorias":
        navigation.navigate("Categories")
        break

      case "Editar Perfil":
        navigation.navigate("EditProfile")
        break

      case "Configurações":
        console.log("Navegar para tela de configurações")
        break

      case "Ajuda":
        navigation.navigate("helpScreen")
        break

      case "Deletar Conta":
        navigation.navigate("deleteProfile")
        break

      default:
        console.log(`Opção desconhecida: ${label}`)
    }
  }

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={() => handleOptionPress(item.label)}
    >
      <Ionicons name={item.icon} size={24} color={colors.primary} />
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color={colors.black} />
      <Text style={styles.title}>{userInfo?.name}</Text>

      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.optionsList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
    marginVertical: 20,
  },
  optionsList: {
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundChat,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
})

export default Profile
