import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useAuth } from "../../context/AuthContext"
import { Link } from "@react-navigation/native"
import { Formik } from "formik"
import * as Yup from "yup"
import { TextInput } from "react-native-paper"

import CustomTextInput from "../../components/formik/CustomTextInput"
import ErrorMessageFormik from "../../components/formik/ErrorMessageFormik"
import CustomButton from "../../components/formik/CustomButton"
import ErrorModal from "../../components/modals/ErrorModal"
import colors from "../../utils/colors"

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
})

export default function Login() {
  const { onLogin } = useAuth()
  const [secureText, setSecureText] = useState(true)
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorModalText, setErrorModalText] = useState("")

  const login = async (values: { email: string; password: string }) => {
    try {
      const result = await onLogin!(values.email, values.password)
      if (result?.error) {
        setErrorModalText(result.msg)
        setErrorModalVisible(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          Gestão no<Text style={{ color: colors.black }}> Bolso</Text>
        </Text>
      </View>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={login}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          resetForm,
        }) => (
          <View style={styles.form}>
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

            <CustomButton onPress={() => handleSubmit()} title="Entrar" />

            <Link
              screen="Register"
              params={{}}
              style={styles.link}
              onPress={() => {
                resetForm()
              }}
            >
              Criar uma conta
            </Link>
          </View>
        )}
      </Formik>

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
    fontSize: 45,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  form: {
    gap: 5,
    width: "70%",
  },
  link: {
    marginTop: 15,
    fontSize: 15,
    color: colors.primaryDark,
  },
  input: {
    marginTop: 5,
    marginBottom: 2,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: 50,
  },
})
