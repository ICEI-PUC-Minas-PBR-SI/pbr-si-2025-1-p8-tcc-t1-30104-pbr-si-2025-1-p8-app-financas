import React from "react"
import { TextInput } from "react-native-paper"
import { StyleSheet, TextInputProps } from "react-native"

interface CustomTextInputProps extends TextInputProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  style?: object
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "decimal-pad"
    | "number-pad"
    | "url"
    | "visible-password"
  disabled?: boolean
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChangeText,
  style,
  keyboardType = "default",
  disabled = false,
}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style]}
      mode="outlined"
      outlineColor="#ccc"
      activeOutlineColor="#007BFF"
      keyboardType={keyboardType}
      disabled={disabled}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    marginBottom: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
  },
})

export default CustomTextInput
