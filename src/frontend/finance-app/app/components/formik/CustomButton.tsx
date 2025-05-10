import React from "react"
import { StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Button } from "react-native-paper"
import colors from "../../utils/colors"

interface CustomButtonProps {
  onPress: () => void
  title: string
  style?: ViewStyle | ViewStyle[]
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  style,
}) => {
  const buttonStyle = style
    ? [styles.button, style]
    : [styles.button, { backgroundColor: colors.primary }]

  return (
    <Button
      onPress={onPress}
      style={buttonStyle}
      labelStyle={styles.buttonLabel}
    >
      {title}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    marginTop: 20,
  },
  buttonLabel: {
    color: colors.white,
  },
  text: {
    color: colors.textPrimary,
  },
})

export default CustomButton
