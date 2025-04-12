import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker'
import { TextInput as PaperInput } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates'
import { Header } from '../components/Header'

export const AddTransaction = () => {
  const navigation = useNavigation()

  const [categoria, setCategoria] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [detalhes, setDetalhes] = useState('')
  const [valor, setValor] = useState('')
  const [data, setData] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [categoriaOpen, setCategoriaOpen] = useState(false)
  const [tipoOpen, setTipoOpen] = useState(false)

  const categorias = [
    { label: 'Alimentação', value: 'alimentacao' },
    { label: 'Transporte', value: 'transporte' },
    { label: 'Lazer', value: 'lazer' },
  ]

  const tipos = [
    { label: 'Entrada', value: 'entrada' },
    { label: 'Saída', value: 'saida' },
  ]

  const handleSalvar = () => {
    console.log({ categoria, detalhes, valor, tipo, data })
  }

  return (
    <View style={styles.container}>
      <Header title="Adicionar" showAttachment />

      <View style={styles.card}>
        <DropDownPicker
          open={categoriaOpen}
          value={categoria}
          items={categorias}
          setOpen={setCategoriaOpen}
          setValue={setCategoria}
          placeholder="Categoria"
          style={styles.dropdown}
          dropDownContainerStyle={{ borderRadius: 8 }}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate('NewCategory')}
        ></TouchableOpacity>

        <PaperInput
          label="Detalhes"
          value={detalhes}
          mode="outlined"
          onChangeText={setDetalhes}
          style={styles.input}
        />

        <PaperInput
          label="Valor"
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
        />

        <DropDownPicker
          open={tipoOpen}
          value={tipo}
          items={tipos}
          setOpen={setTipoOpen}
          setValue={setTipo}
          placeholder="Tipo"
          style={styles.dropdown}
          dropDownContainerStyle={{ borderRadius: 8 }}
        />

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            Data: {data.getDate()} / {data.getMonth() + 1} /{' '}
            {data.getFullYear()}
          </Text>
          <Ionicons name="calendar-outline" size={20} color="#333" />
        </TouchableOpacity>

        <DatePickerModal
          locale="pt"
          mode="single"
          visible={showDatePicker}
          date={data}
          onConfirm={({ date }) => {
            setShowDatePicker(false)
            if (date) setData(date)
          }}
          onDismiss={() => setShowDatePicker(false)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f1f1' },
  header: {
    backgroundColor: '#2c8f8f',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    gap: 12,
  },
  input: {
    backgroundColor: '#fff',
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#2c8f8f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})

export default AddTransaction
