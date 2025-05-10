import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native"
import colors from "../utils/colors"
import CustomButton from "../components/formik/CustomButton"

export default function HelpPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Necessita de Ajuda?</Text>
      <Text style={styles.description}>
        Se você precisar de assistência, não hesite em nos contatar. Nossa
        equipe está disponível para ajudar com qualquer dúvida ou problema que
        você possa ter.
      </Text>

      <Text style={styles.contactTitle}>Entre em contato:</Text>
      <Text style={styles.email}>gestaonobolsosuporte@gmail.com</Text>
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>
          Estamos sempre aqui para ajudar você a melhorar sua experiência com o
          nosso aplicativo.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.defaultText,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: colors.defaultText,
    marginBottom: 20,
    textAlign: "center",
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.defaultText,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: colors.defaultText,
    fontWeight: "bold",
  },
  footerContainer: {
    marginTop: "auto",
    marginBottom: 20,
  },
  footer: {
    fontSize: 14,
    color: colors.defaultText,
    textAlign: "center",
  },
})
