import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Formik } from "formik"
import * as Yup from "yup"
import { useAuth } from "../../context/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { TextInput } from "react-native-paper"

import CustomTextInput from "../../components/formik/CustomTextInput"
import ErrorMessageFormik from "../../components/formik/ErrorMessageFormik"
import CustomButton from "../../components/formik/CustomButton"
import SuccessModal from "../../components/modals/SuccessModal"
import ErrorModal from "../../components/modals/ErrorModal"

import colors from "../../utils/colors"
import { formatCPF, unformatCPF } from "../../utils/format"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome completo é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  document: Yup.string().required("CPF é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
})

export default function Signup() {
  const { onRegister } = useAuth()
  const navigation = useNavigation()

  const [secureText, setSecureText] = useState(true)
  const [secureTextConfirm, setSecureTextConfirm] = useState(true)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorModalText, setErrorModalText] = useState("")

  const register = async (values: {
    name: string
    email: string
    password: string
    document: string
  }) => {
    try {
      const result = await onRegister!(
        values.name,
        values.email,
        unformatCPF(values.document),
        values.password,
      )

      if (result?.error) {
        setErrorModalText(result.msg)
        setErrorModalVisible(true)
      } else {
        setSuccessModalVisible(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Faça seu cadastro!</Text>
      </View>

      <Formik
        initialValues={{
          name: "",
          email: "",
          document: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={register}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <CustomTextInput
              label="Nome completo"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            <ErrorMessageFormik
              error={touched.name ? errors.name : undefined}
            />

            <CustomTextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
            />
            <ErrorMessageFormik
              error={touched.email ? errors.email : undefined}
            />

            <CustomTextInput
              label="CPF"
              value={values.document}
              onChangeText={text => handleChange("document")(formatCPF(text))}
              onBlur={handleBlur("document")}
              keyboardType="numeric"
            />
            <ErrorMessageFormik
              error={touched.document ? errors.document : undefined}
            />

            <TextInput
              label="Senha"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry={secureText}
              mode="outlined"
              style={styles.input}
              outlineColor="#ccc"
              activeOutlineColor="#007BFF"
              right={
                <TextInput.Icon
                  icon={secureText ? "eye-off" : "eye"}
                  onPress={() => setSecureText(!secureText)}
                />
              }
            />
            <ErrorMessageFormik
              error={touched.password ? errors.password : undefined}
            />

            <TextInput
              label="Confirme a Senha"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              secureTextEntry={secureTextConfirm}
              mode="outlined"
              style={styles.input}
              outlineColor="#ccc"
              activeOutlineColor="#007BFF"
              right={
                <TextInput.Icon
                  icon={secureTextConfirm ? "eye-off" : "eye"}
                  onPress={() => setSecureTextConfirm(!secureTextConfirm)}
                />
              }
            />
            <ErrorMessageFormik
              error={
                touched.confirmPassword ? errors.confirmPassword : undefined
              }
            />

            <CustomButton onPress={() => handleSubmit()} title="Cadastrar" />

            <ErrorModal
              visible={errorModalVisible}
              message={errorModalText}
              onClose={() => setErrorModalVisible(false)}
            />
          </View>
        )}
      </Formik>

      <SuccessModal
        visible={successModalVisible}
        message="Seu cadastro foi concluído com sucesso."
        onClose={() => {
          setSuccessModalVisible(false)
          navigation.goBack()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: colors.background,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  form: {
    gap: 5,
    width: "70%",
  },
  input: {
    marginTop: 5,
    marginBottom: 2,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: 50,
  },
})
