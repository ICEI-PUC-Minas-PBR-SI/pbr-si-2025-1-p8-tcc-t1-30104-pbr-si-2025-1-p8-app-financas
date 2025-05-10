import api from "./api"
import axios from "axios"

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
        error.response?.data?.message || error.message || "Erro desconhecido"
      console.error(`Erro ao fazer PUT para ${endpoint}:`, errorMessage)
      throw new Error(errorMessage)
    } else {
      console.error(`Erro inesperado ao fazer PUT:`, error)
      throw new Error("Erro inesperado ao atualizar dados.")
    }
  }
}

export const getRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await api.get<T>(endpoint)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || error.message || "Erro desconhecido"
      console.error(`Erro ao fazer GET para ${endpoint}:`, errorMessage)
      throw new Error(errorMessage)
    } else {
      console.error(`Erro inesperado ao fazer GET:`, error)
      throw new Error("Erro inesperado ao buscar os dados.")
    }
  }
}

export const postRequest = async <T>(
  endpoint: string,
  data: any,
): Promise<T> => {
  try {
    const response = await api.post<T>(endpoint, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || error.message || "Erro desconhecido"
      console.error(`Erro ao fazer POST para ${endpoint}:`, errorMessage)
      throw new Error(errorMessage)
    } else {
      console.error(`Erro inesperado ao fazer POST:`, error)
      throw new Error("Erro inesperado ao atualizar dados.")
    }
  }
}

export const deleteRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await api.delete<T>(endpoint)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || error.message || "Erro desconhecido"
      console.error(`Erro ao fazer DELETE para ${endpoint}:`, errorMessage)
      throw new Error(errorMessage)
    } else {
      console.error(`Erro inesperado ao fazer DELETE:`, error)
      throw new Error("Erro inesperado ao deletar dados.")
    }
  }
}
