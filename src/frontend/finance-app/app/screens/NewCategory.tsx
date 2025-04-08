import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../components/Header'
import { AppTextInput } from '../components/AppTextInput'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ErrorMessageFormik from '../components/formik/ErrorMessageFormik'

export const NewCategory = () => {
  const [categoryName, setCategoryName] = useState('')
  const navigation = useNavigation()

  const handleReset = () => {
    console.log('Resetar categorias')
  }

  const handleSave = () => {
    console.log('Salvar categoria:', categoryName)
  }

  return (
    <View style={styles.container}>
      <Header title="Criar nova Categoria" showAttachment />

      <View style={styles.card}>
        <Formik
          initialValues={{ category: '' }}
          validationSchema={Yup.object({
            category: Yup.string().required(
              'É obrigatório a adição do nome da categoria',
            ),
          })}
          onSubmit={handleSave}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <AppTextInput
                label="Nome da nova categoria"
                value={values.category}
                onChangeText={handleChange('category')}
                onBlur={handleBlur('category')}
                error={errors.category}
                touched={touched.category}
              />

              <ErrorMessageFormik
                error={touched.category ? errors.category : undefined}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleReset}
                >
                  <Text style={styles.resetText}>Resetar categorias</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.saveText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
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
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#2c8f8f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
})

export default NewCategory
