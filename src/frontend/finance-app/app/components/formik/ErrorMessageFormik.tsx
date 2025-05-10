import React from "react"
import { Text, StyleSheet, TextStyle } from "react-native"

interface ErrorMessageProps {
  error?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null
  return <Text style={styles.error}>{error}</Text>
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 0,
  } as TextStyle,
})

export default ErrorMessage
