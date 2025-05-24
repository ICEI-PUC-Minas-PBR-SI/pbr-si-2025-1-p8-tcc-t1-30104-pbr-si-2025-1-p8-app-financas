import React, { useCallback, useEffect, useRef, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import DropDownPicker from "react-native-dropdown-picker"
import { TextInput } from "react-native-paper"
import { DatePickerInput } from "react-native-paper-dates"
import { useAuth } from "../../context/AuthContext"
import { getRequest } from "../../services/apiServices"
import { Category } from "../../utils/types"
import colors from "../../utils/colors"
import { Formik } from "formik"
import * as Yup from "yup"
import CustomTextInput from "../../components/formik/CustomTextInput2"
import { formatCurrency, formatMoney, formatDateBR } from "../../utils/format"
import { postRequest } from "../../services/apiServices"
import SuccessModal from "../../components/modals/SuccessModal"
import ErrorModal from "../../components/modals/ErrorModal"

const types = [
  { label: "Entrada", value: "entrada" },
  { label: "Saída", value: "saida" },
]

const validationSchema = Yup.object().shape({
  categoryId: Yup.number().required("Categoria é obrigatório"),
  type: Yup.string().required("Tipo é obrigatório"),
  title: Yup.string().required("Título é obrigatório"),
  amount: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "Valor inválido")
    .required("Valor é obrigatório"),
  date: Yup.string().required("Data é obrigatória"),
})

export const AddTransaction = () => {
  const { userId } = useAuth()
  const formRef = useRef<any>(null)
  const navigation = useNavigation()
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)

  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalText, setSuccessModalText] = useState("")
  const [errorModalText, setErrorModalText] = useState("")
  const [errorModalVisible, setErrorModalVisible] = useState(false)

  const fetchCategories = async () => {
    try {
      const data: Category[] = await getRequest(`category/byuser/${userId}`)
      setCategories(data.filter(c => c.active))
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchCategories()
    }, []),
  )

  useFocusEffect(
    useCallback(() => {
      formRef.current?.resetForm()
      setTypeOpen(false)
      setCategoryOpen(false)
    }, []),
  )

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

      setSuccessModalVisible(true)
      setSuccessModalText("Transação criada com sucesso!")
    } catch (error: any) {
      setErrorModalVisible(true)
      setErrorModalText(error.message || "Erro ao criar nova Transação.")
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
            type: "",
            title: "",
            amount: "",
            date: undefined,
          }}
          innerRef={formRef}
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
                  setValue={val => setFieldValue("categoryId", val())}
                  placeholder="Selecione a categoria"
                  style={styles.dropdown}
                  dropDownContainerStyle={{ borderRadius: 8 }}
                  zIndex={3000}
                  translation={{
                    NOTHING_TO_SHOW: "Nenhuma categoria foi encontrada",
                  }}
                />
                {touched.categoryId && errors.categoryId && (
                  <Text style={{ color: "red" }}>{errors.categoryId}</Text>
                )}

                <CustomTextInput
                  label="Título"
                  value={values.title}
                  onChangeText={handleChange("title")}
                />
                {touched.title && errors.title && (
                  <Text style={{ color: "red" }}>{errors.title}</Text>
                )}

                <TextInput
                  label="Valor"
                  value={formatCurrency(values.amount)}
                  onChangeText={text => {
                    const numericValue = text.replace(/[^\d]/g, "")
                    handleChange("amount")(numericValue)
                  }}
                  style={[styles.input]}
                  mode="outlined"
                  outlineColor="#ccc"
                  activeOutlineColor="#007BFF"
                  keyboardType="numeric"
                />

                {touched.amount && errors.amount && (
                  <Text style={{ color: "red" }}>{errors.amount}</Text>
                )}

                <DropDownPicker
                  open={typeOpen}
                  value={values.type}
                  items={types}
                  setOpen={setTypeOpen}
                  setValue={val => setFieldValue("type", val())}
                  placeholder="Selecione o tipo"
                  style={styles.dropdown}
                  dropDownContainerStyle={{ borderRadius: 8 }}
                  zIndex={2000}
                />
                {touched.type && errors.type && (
                  <Text style={{ color: "red" }}>{errors.type}</Text>
                )}

                <View style={{ marginTop: 20, marginBottom: 20 }}>
                  <DatePickerInput
                    locale="pt"
                    label="Escolha uma data"
                    withDateFormatInLabel={false}
                    value={values.date}
                    onChange={d => {
                      setFieldValue("date", d)
                    }}
                    inputMode="end"
                    style={[
                      styles.input,
                      { borderWidth: 1, borderColor: "#ccc", borderRadius: 5 },
                    ]}
                  />
                </View>
                {touched.date && errors.date && (
                  <Text style={{ color: "red" }}>{errors.date}</Text>
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
      <SuccessModal
        visible={successModalVisible}
        message={successModalText}
        onClose={() => {
          setSuccessModalVisible(false)
          formRef.current?.resetForm()
          navigation.goBack()
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
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
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
  card: {
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 50,
    borderBottomWidth: 0,
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 0,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#2c8f8f",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
})

export default AddTransaction
