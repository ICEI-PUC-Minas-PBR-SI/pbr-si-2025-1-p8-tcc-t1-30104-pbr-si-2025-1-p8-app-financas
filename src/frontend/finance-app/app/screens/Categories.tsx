import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header } from '../components/Header'
import { AppTextInput } from '../components/AppTextInput'
import { Formik } from 'formik'
import * as Yup from 'yup'
import ErrorMessageFormik from '../components/formik/ErrorMessageFormik'
import { getRequest } from '../services/apiServices'
import { Category } from '../services/types'
import { useAuth } from '../context/AuthContext'
import colors from '../utils/colors'

export const Categories = () => {
  const { userId } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: Category[] = await getRequest(`category/byuser/${userId}`)
        setCategories(data)
      } catch (error) {
        console.error('Erro ao buscar transações:', error)
      }
    }

    fetchCategories()
  }, [userId])

  const handleReset = () => {
    setCategories([])
  }

  const handleSave = (values: { category: string }, { resetForm }: any) => {
    setCategories([...categories, values.category])
    resetForm()
  }

  const handleDelete = (name: string) => {
    Alert.alert('Confirmar exclusão', `Deseja excluir a categoria "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setCategories(categories.filter(cat => cat !== name))
        },
      },
    ])
  }

  const handleEdit = (name: string) => {
    Alert.alert(
      'Editar categoria',
      `Função de editar "${name}" ainda não implementada.`,
    )
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

      {categories.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Categorias Existentes</Text>
            <FlatList
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.categoryItem}>
                  <Text style={styles.categoryText}>{item.name}</Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEdit(item)}
                    >
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(item)}
                    >
                      <Text style={styles.buttonText}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  scrollContent: {
    paddingBottom: 40,
    marginTop: 20,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
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
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  deleteButton: {
    backgroundColor: colors.error,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
})

export default Categories
