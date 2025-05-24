import axios from "axios"
import * as SecureStore from "expo-secure-store"
const TOKEN_KEY = "my-jwt"

const api = axios.create({
  baseURL: "http://192.168.18.222:3000", // Mudar para o IP do servidor
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

export default api
