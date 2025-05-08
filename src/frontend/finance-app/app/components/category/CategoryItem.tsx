import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Category } from '../../services/types'
import colors from '../../utils/colors'

interface Props {
  category: Category
  onEdit: (category: Category) => void
  onToggleActive: (category: Category) => void
}

export const CategoryItem: React.FC<Props> = ({
  category,
  onEdit,
  onToggleActive,
}) => (
  <View style={styles.container}>
    <Text style={[styles.name, !category.active && styles.inactiveText]}>
      {category.name} {category.active ? '' : '(Desativada)'}
    </Text>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.edit} onPress={() => onEdit(category)}>
        <Text style={styles.text}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={category.active ? styles.deactivate : styles.activate}
        onPress={() => onToggleActive(category)}
      >
        <Text style={styles.text}>
          {category.active ? 'Desativar' : 'Reativar'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    width: '95%',
  },
  name: { fontSize: 14, flex: 1 },
  actions: { flexDirection: 'row', gap: 8 },
  edit: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  deactivate: {
    backgroundColor: colors.error,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activate: {
    backgroundColor: colors.success,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  inactive: {
    opacity: 0.4,
  },
  inactiveText: {
    color: colors.gray,
    fontStyle: 'italic',
  },
})
