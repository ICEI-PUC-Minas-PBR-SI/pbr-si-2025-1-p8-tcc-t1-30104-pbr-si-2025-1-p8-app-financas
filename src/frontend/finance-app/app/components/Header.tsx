import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import colors from '../utils/colors'

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
      {showAttachment ? (
        <Ionicons name="attach" size={24} color={colors.white} />
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
})
