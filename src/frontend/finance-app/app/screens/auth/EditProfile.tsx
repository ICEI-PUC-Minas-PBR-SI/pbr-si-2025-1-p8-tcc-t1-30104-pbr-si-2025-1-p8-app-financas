import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import CustomTextInput from '../../components/formik/CustomTextInput'
import ErrorMessageFormik from '../../components/formik/ErrorMessageFormik'
import CustomButton from '../../components/formik/CustomButton'
import { useAuth } from '../../context/AuthContext'
import colors from '../../utils/colors'
import { useNavigation } from '@react-navigation/native'
import { putRequest } from '../../services/apiServices'
import SuccessModal from '../../components/modals/SuccessModal'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('O nome é obrigatório')
    .matches(
      /^[A-Za-zÀ-ÿ\s]+$/,
      'O nome não pode conter números ou caracteres especiais',
    ),
})

export default function EditProfile() {
  const { userInfo, userId, onLogout } = useAuth()
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const navigation = useNavigation()

  const handleUpdate = async (values: { name: string }) => {
    try {
      await putRequest<{ message: string }>(`users/edituser/${userId}`, {
        name: values.name,
      })
      setSuccessModalVisible(true)
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao atualizar.')
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Informações</Text>
      <Formik
        initialValues={{ name: userInfo.name, email: userInfo.email }}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
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
              label="Nome"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            <ErrorMessageFormik
              error={touched.name ? errors.name : undefined}
            />
            <CustomTextInput
              label="E-mail"
              value={values.email}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              disabled
            />
            <CustomButton
              title="Salvar alterações"
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>

      <SuccessModal
        visible={successModalVisible}
        message="Nome atualizado com sucesso! Para que a alteração seja aplicada é necessário realizar o login novamente!"
        onClose={() => {
          setSuccessModalVisible(false)
          onLogout?.()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 30,
  },
  form: {
    width: '100%',
    gap: 10,
  },
})
