import React, { useRef, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import * as Yup from "yup"
import { TextInput } from "react-native-paper"
import SuccessModal from "../../components/modals/SuccessModal"
import ErrorModal from "../../components/modals/ErrorModal"
import DropDownPicker from "react-native-dropdown-picker"
import SimulationModal from "../../components/investment/SimulationModal"
import { useAuth } from "../../context/AuthContext"
import { postRequest } from "../../services/apiServices"
import { formatCurrency, formatMoney } from "../../utils/format"

const validationSchema = Yup.object().shape({
  type: Yup.string().required("Tipo é obrigatório"),
  amount: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "Valor inválido")
    .required("Valor inicial é obrigatório"),
  months: Yup.number()
    .typeError("Meses deve ser um número")
    .integer("Meses deve ser inteiro")
    .positive("Meses deve ser maior que zero")
    .required("Meses é obrigatório"),
  monthlyContribution: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "Valor inválido")
    .required("Valor de aporte mensal é obrigatório"),
})

const typeOptions = [
  { label: "Selic", value: "selic" },
  { label: "CDI", value: "cdi" },
  { label: "IPCA", value: "ipca" },
]

export const CreateInvestment = () => {
  const navigation = useNavigation()
  const formRef = useRef<any>(null)
  const { userId } = useAuth()

  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successModalText, setSuccessModalText] = useState("")
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorModalText, setErrorModalText] = useState("")
  const [typeOpen, setTypeOpen] = useState(false)

  const [simulationModalVisible, setSimulationModalVisible] = useState(false)
  const [simulationData, setSimulationData] = useState<any>(null)

  const simulateInvestment = async (values: any) => {
    try {
      const body = {
        ...values,
        amount: parseFloat(formatMoney(values.amount)),
        monthlyContribution: parseFloat(
          formatMoney(values.monthlyContribution),
        ),
        months: Number(values.months),
      }
      const response = await postRequest(`investment/simulate`, body)

      setSimulationData(response)
      setSimulationModalVisible(true)
    } catch (error: any) {
      setErrorModalText(error.message || "Erro ao simular investimento.")
      setErrorModalVisible(true)
    }
  }

  const saveInvestment = async (title: string) => {
    if (!simulationData || !userId) return

    const body = {
      type: simulationData.type,
      title,
      amount: simulationData.amount,
      monthlyContribution: simulationData.monthlyContribution,
      months: Number(simulationData.months),
    }

    try {
      await postRequest(`investment/simulate/${userId}`, body)
      setSimulationModalVisible(false)
      setSuccessModalText(`Investimento "${title}" criado com sucesso!`)
      setSuccessModalVisible(true)
    } catch (error: any) {
      setErrorModalVisible(true)
      setErrorModalText(error.message || "Erro ao criar nova Transação.")
    }
    formRef.current?.resetForm()
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <Formik
          initialValues={{
            type: "selic",
            amount: "",
            months: "",
            monthlyContribution: "",
          }}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={values => {
            simulateInvestment(values)
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            resetForm,
          }) => (
            <View style={styles.card}>
              <DropDownPicker
                open={typeOpen}
                value={values.type}
                items={typeOptions}
                setOpen={setTypeOpen}
                setValue={val => setFieldValue("type", val())}
                placeholder="Selecione o tipo"
                style={styles.dropdown}
                dropDownContainerStyle={{ borderRadius: 8 }}
                zIndex={3000}
                translation={{
                  NOTHING_TO_SHOW: "Nenhum tipo disponível",
                }}
              />
              {touched.type && errors.type && (
                <Text style={styles.errorText}>{errors.type}</Text>
              )}
              <TextInput
                label="Valor Inicial (R$)"
                value={formatCurrency(values.amount)}
                onChangeText={text => {
                  const numericValue = text.replace(/[^\d]/g, "")
                  setFieldValue("amount", numericValue)
                }}
                style={[styles.input]}
                mode="outlined"
                outlineColor="#ccc"
                activeOutlineColor="#007BFF"
                keyboardType="numeric"
              />
              {touched.amount && errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
              <TextInput
                label="Aporte mensal (R$)"
                value={formatCurrency(values.monthlyContribution)}
                onChangeText={text => {
                  const numericValue = text.replace(/[^\d]/g, "")
                  setFieldValue("monthlyContribution", numericValue)
                }}
                style={[styles.input]}
                mode="outlined"
                outlineColor="#ccc"
                activeOutlineColor="#007BFF"
                keyboardType="numeric"
              />
              {touched.monthlyContribution && errors.monthlyContribution && (
                <Text style={styles.errorText}>
                  {errors.monthlyContribution}
                </Text>
              )}
              <TextInput
                label="Meses"
                value={values.months}
                onChangeText={handleChange("months")}
                onBlur={handleBlur("months")}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
              />
              {touched.months && errors.months && (
                <Text style={styles.errorText}>{errors.months}</Text>
              )}

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.saveText}>Simular novo Investimento</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>

      <SimulationModal
        visible={simulationModalVisible}
        simulationData={simulationData}
        onClose={() => setSimulationModalVisible(false)}
        onSave={saveInvestment}
      />

      <SuccessModal
        visible={successModalVisible}
        message={successModalText}
        onClose={() => {
          setSuccessModalVisible(false)
          navigation.goBack()
        }}
      />

      <ErrorModal
        visible={errorModalVisible}
        message={errorModalText}
        onClose={() => setErrorModalVisible(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    width: "90%",
    zIndex: 1,
  },
  card: {
    backgroundColor: "#fff",
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
  errorText: {
    color: "red",
    marginBottom: 5,
    marginLeft: 5,
  },
  dropdown: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    height: 45,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
})

export default CreateInvestment
