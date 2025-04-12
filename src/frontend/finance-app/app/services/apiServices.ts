import api from './api'
import axios from 'axios'

export const putRequest = async <T>(
  endpoint: string,
  data: any,
): Promise<T> => {
  try {
    const response = await api.put<T>(endpoint, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Erro desconhecido'
      console.error(`Erro ao fazer PUT para ${endpoint}:`, errorMessage)
      throw new Error(errorMessage)
    } else {
      console.error(`Erro inesperado ao fazer PUT:`, error)
      throw new Error('Erro inesperado ao atualizar dados.')
    }
  }
}
