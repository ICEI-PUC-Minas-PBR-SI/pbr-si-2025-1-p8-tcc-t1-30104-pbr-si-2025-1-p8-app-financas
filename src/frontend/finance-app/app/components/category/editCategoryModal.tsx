import React from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import colors from '../../utils/colors'

interface Props {
  visible: boolean
  value: string
  onChange: (text: string) => void
  onCancel: () => void
  onSave: () => void
}

export const EditCategoryModal: React.FC<Props> = ({
  visible,
  value,
  onChange,
  onCancel,
  onSave,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onCancel}
  >
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Editar Categoria</Text>
        <TextInput value={value} onChangeText={onChange} style={styles.input} />
        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancel} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={onSave}>
            <Text style={styles.saveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: { marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  cancel: {
    backgroundColor: colors.error,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
  },
  save: {
    backgroundColor: colors.primaryBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: { color: '#fff', fontWeight: '600' },
  saveText: { color: '#fff', fontWeight: '600' },
})
