import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import colors from "../utils/colors"

interface HeaderProps {
  title: string
  showBack?: boolean
  showAttachment?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showAttachment = false,
}) => {
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryBackground,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
})
