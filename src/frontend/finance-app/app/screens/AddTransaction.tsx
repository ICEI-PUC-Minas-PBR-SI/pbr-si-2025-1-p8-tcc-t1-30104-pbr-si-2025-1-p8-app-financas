import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import { TextInput as PaperInput, TextInput } from 'react-native-paper'
import { DatePickerInput, DatePickerModal } from 'react-native-paper-dates'
import { useAuth } from '../context/AuthContext'
import { getRequest } from '../services/apiServices'
import { Category } from '../services/types'
import colors from '../utils/colors'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CustomTextInput from '../components/formik/CustomTextInput2'
import { formatCurrency, formatMoney, formatDateBR } from '../utils/format'
import { postRequest } from '../services/apiServices'

export const AddTransaction = () => {
  const { userId } = useAuth()
  const navigation = useNavigation()
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)
  const [inputDate, setInputDate] = React.useState<Date | undefined>(undefined)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: Category[] = await getRequest(`category/byuser/${userId}`)
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [userId])

  const types = [
    { label: 'Entrada', value: 'entrada' },
    { label: 'Saída', value: 'saida' },
  ]

  const validationSchema = Yup.object().shape({
    categoryId: Yup.number().required('Categoria é obrigatório'),
    type: Yup.string().required('Tipo é obrigatório'),
    title: Yup.string().required('Título é obrigatório'),
    amount: Yup.string()
      .matches(/^\d+(\.\d{1,2})?$/, 'Valor inválido')
      .required('Valor é obrigatório'),
    date: Yup.string().required('Data é obrigatória'),
  })

  const handleCreate = async (values: any, resetForm: Function) => {
    const payload = {
      userId,
      categoryId: values.categoryId,
      type: values.type,
      title: values.title,
      amount: parseFloat(formatMoney(values.amount)),
      date: formatDateBR(values.date),
    }
    try {
      await postRequest(`transaction`, payload)
      Alert.alert('Sucesso', 'Transação criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            resetForm()
            setInputDate(undefined)
            navigation.goBack()
          },
        },
      ])
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar nova Transação.')
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Criar nova transação</Text>
      </View>

      <View style={styles.cardWrapper}>
        <Formik
          initialValues={{
            categoryId: null,
            type: '',
            title: '',
            amount: '',
            date: undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleCreate(values, resetForm)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            resetForm,
          }) => {
            useFocusEffect(
              React.useCallback(() => {
                return () => {
                  resetForm()
                  setInputDate(undefined)
                }
              }, []),
            )

            return (
              <View style={styles.card}>
                <DropDownPicker
                  open={categoryOpen}
                  value={values.categoryId}
                  items={categories.map(c => ({
                    label: c.name,
                    value: c.id,
                  }))}
                  setOpen={setCategoryOpen}
                  setValue={val => setFieldValue('categoryId', val())}
                  placeholder="Selecione a categoria"
                  style={styles.dropdown}
                  dropDownContainerStyle={{ borderRadius: 8 }}
                  zIndex={3000}
                />
                {touched.categoryId && errors.categoryId && (
                  <Text style={{ color: 'red' }}>{errors.categoryId}</Text>
                )}

                <CustomTextInput
                  label="Título"
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                {touched.title && errors.title && (
                  <Text style={{ color: 'red' }}>{errors.title}</Text>
                )}

                <TextInput
                  label="Valor"
                  value={formatCurrency(values.amount)}
                  onChangeText={text => {
                    const numericValue = text.replace(/[^\d]/g, '')
                    handleChange('amount')(numericValue)
                  }}
                  style={[styles.input]}
                  mode="outlined"
                  outlineColor="#ccc"
                  activeOutlineColor="#007BFF"
                  keyboardType="numeric"
                />

                {touched.amount && errors.amount && (
                  <Text style={{ color: 'red' }}>{errors.amount}</Text>
                )}

                <DropDownPicker
                  open={typeOpen}
                  value={values.type}
                  items={types}
                  setOpen={setTypeOpen}
                  setValue={val => setFieldValue('type', val())}
                  placeholder="Selecione o tipo"
                  style={styles.dropdown}
                  dropDownContainerStyle={{ borderRadius: 8 }}
                  zIndex={2000}
                />
                {touched.type && errors.type && (
                  <Text style={{ color: 'red' }}>{errors.type}</Text>
                )}

                <View style={{ marginTop: 20, marginBottom: 20 }}>
                  <DatePickerInput
                    locale="pt"
                    label="Escolha uma data"
                    value={values.date}
                    onChange={d => {
                      setInputDate(d)
                      setFieldValue('date', d)
                    }}
                    inputMode="end"
                    style={[
                      styles.input,
                      { borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
                    ]}
                  />
                </View>
                {touched.date && errors.date && (
                  <Text style={{ color: 'red' }}>{errors.date}</Text>
                )}

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.saveText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            )
          }}
        </Formik>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.primaryBackground,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 0,
  },
  cardWrapper: {
    marginTop: 120,
    zIndex: 1,
    paddingHorizontal: 16,
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
    marginTop: 5,
    marginBottom: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 50,
    borderBottomWidth: 0,
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
    marginTop: 10,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
})

export default AddTransaction
