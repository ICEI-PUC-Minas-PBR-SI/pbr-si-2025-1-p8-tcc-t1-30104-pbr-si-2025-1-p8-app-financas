import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  View,
  Text,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { Formik } from "formik"
import * as Yup from "yup"
import colors from "../../utils/colors"
import { useAuth } from "../../context/AuthContext"
import { getRequest, postRequest, putRequest } from "../../services/apiServices"
import { Category } from "../../services/types"
import { Header } from "../../components/Header"
import ErrorMessageFormik from "../../components/formik/ErrorMessageFormik"
import { CategoryItem } from "../../components/category/CategoryItem"
import { EditCategoryModal } from "../../components/category/editCategoryModal"
import ConfirmModal from "../../components/modals/ConfirmModal"
import CustomTextInput from "../../components/formik/CustomTextInput2"
import SuccessModal from "../../components/modals/SuccessModal"
import ErrorModal from "../../components/modals/ErrorModal"

export const Categories = () => {
  const { userId } = useAuth()
  const formRef = useRef<any>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [categoryToToggle, setCategoryToToggle] = useState<Category | null>(
    null,
  )

  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalText, setSuccessModalText] = useState("")
  const [errorModalText, setErrorModalText] = useState("")
  const [errorModalVisible, setErrorModalVisible] = useState(false)

  const fetchCategories = async () => {
    try {
      const data: Category[] = await getRequest(`category/byuser/${userId}`)
      setCategories(data)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCategories()
    }, []),
  )

  useFocusEffect(
    React.useCallback(() => {
      formRef.current?.resetForm()
    }, []),
  )

  const handleSave = async (
    values: { category: string },
    { resetForm }: any,
  ) => {
    try {
      await postRequest("category", { name: values.category, userId })
      setSuccessModalVisible(true)
      setSuccessModalText("Categoria criada com sucesso!")
      resetForm()
      fetchCategories()
    } catch (error: any) {
      setErrorModalText(error.message || "Erro ao criar categoria")
      setErrorModalVisible(true)
    }
  }

  const handleEditSave = async () => {
    if (!editingCategory || newCategoryName === editingCategory.name) {
      setModalVisible(false)
      return
    }

    try {
      await putRequest(`category/updatename/${editingCategory.id}`, {
        name: newCategoryName,
        userId,
      })
      setSuccessModalVisible(true)
      setSuccessModalText("Categoria atualizada com sucesso!")
      fetchCategories()
    } catch (error: any) {
      setErrorModalVisible(true)
      setErrorModalText(error.message || "Erro ao editar categoria")
    }
    setModalVisible(false)
  }

  const changeActive = (category: Category) => {
    setCategoryToToggle(category)
    setConfirmModalVisible(true)
  }

  const handleConfirmToggle = async () => {
    if (!categoryToToggle) return

    try {
      await putRequest(`category/updateactive/${categoryToToggle.id}`, {
        active: !categoryToToggle.active,
      })
      setConfirmModalVisible(false)
      setCategoryToToggle(null)
      fetchCategories()
      setSuccessModalText("Categoria atualizada com sucesso!")
      setSuccessModalVisible(true)
    } catch (error: any) {
      setErrorModalVisible(true)
      setErrorModalText(error.message || "Erro ao editar categoria")
    }
  }

  return (
    <View style={styles.container}>
      <Header title="Criar nova Categoria" showAttachment />

      <View style={styles.card}>
        <Formik
          initialValues={{ category: "" }}
          validationSchema={Yup.object({
            category: Yup.string().required(
              "É obrigatório informar o nome da categoria",
            ),
          })}
          onSubmit={handleSave}
          innerRef={formRef}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            resetForm,
          }) => {
            return (
              <>
                <CustomTextInput
                  label="Nome da nova categoria"
                  value={values.category}
                  onChangeText={handleChange("category")}
                />

                <ErrorMessageFormik
                  error={touched.category ? errors.category : undefined}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.saveText}>Salvar</Text>
                </TouchableOpacity>
              </>
            )
          }}
        </Formik>
      </View>
      <Text style={styles.listTitle}>Categorias</Text>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={categories}
        style={{ marginLeft: 20 }}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            {categories.length === 0 && (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ fontSize: 16, color: colors.gray }}>
                  Nenhuma categoria encontrada.
                </Text>
              </View>
            )}
          </>
        }
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            onEdit={cat => {
              setEditingCategory(cat)
              setNewCategoryName(cat.name)
              setModalVisible(true)
            }}
            onToggleActive={changeActive}
          />
        )}
      />

      <EditCategoryModal
        visible={modalVisible}
        value={newCategoryName}
        onChange={setNewCategoryName}
        onCancel={() => setModalVisible(false)}
        onSave={handleEditSave}
      />

      <ConfirmModal
        visible={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        onConfirm={handleConfirmToggle}
        title={`${categoryToToggle?.active ? "Desativar" : "Ativar"} Categoria`}
        message={`Deseja realmente ${
          categoryToToggle?.active ? "desativar" : "ativar"
        } a categoria "${categoryToToggle?.name}"?`}
      />

      <SuccessModal
        visible={successModalVisible}
        message={successModalText}
        onClose={() => {
          setSuccessModalVisible(false)
        }}
      />
      <ErrorModal
        visible={errorModalVisible}
        message={errorModalText}
        onClose={() => {
          setErrorModalVisible(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f1f1" },
  card: {
    backgroundColor: "#fff",
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  scrollContent: { paddingBottom: 40, marginTop: 20 },
  saveButton: {
    backgroundColor: colors.primaryBackground,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 12,
  },
  saveText: { color: "#fff", fontWeight: "600" },
  listTitle: {
    fontSize: 18,
    marginLeft: 16,
    marginVertical: 8,
    fontWeight: "bold",
  },
})

export default Categories
