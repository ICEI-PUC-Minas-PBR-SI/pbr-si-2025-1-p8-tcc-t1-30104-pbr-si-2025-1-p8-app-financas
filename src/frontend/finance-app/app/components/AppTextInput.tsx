import React from "react"
import { TextInput as PaperTextInput } from "react-native-paper"
import { StyleSheet } from "react-native"

interface AppTextInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  onBlur?: () => void
  error?: string | undefined
  touched?: boolean
  secureTextEntry?: boolean
  keyboardType?: "default" | "numeric" | "email-address"
}

export const AppTextInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  secureTextEntry = false,
  keyboardType = "default",
}: AppTextInputProps) => {
  return (
    <PaperTextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      error={!!(touched && error)}
      style={styles.input}
      outlineColor="#ccc"
      activeOutlineColor="#2c8f8f"
    />
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
})
