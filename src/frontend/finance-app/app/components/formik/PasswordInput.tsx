import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper"

interface PasswordInputProps {
  label?: string
  value: string
  onChangeText: (text: string) => void
  onBlur: () => void
  [key: string]: any
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <View style={styles.passwordInputContainer}>
      <TextInput
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={!isPasswordVisible}
        label={label}
        right={
          <TextInput.Icon
            icon={isPasswordVisible ? "eye-off" : "eye"}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        }
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 5,
    marginBottom: 0,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: 50,
    paddingLeft: 10,
    paddingRight: 40,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  passwordInputContainer: {
    marginBottom: 10,
    width: "100%",
  },
})

export default PasswordInput
