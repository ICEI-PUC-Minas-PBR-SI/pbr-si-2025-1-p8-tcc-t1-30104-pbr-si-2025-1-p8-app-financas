import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import * as SecureStore from "expo-secure-store"
import API_URL from "../services/api"

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null }
  onRegister?: (
    name: string,
    email: string,
    document: string,
    password: string,
  ) => Promise<any>
  onLogin?: (email: string, password: string) => Promise<any>
  onLogout?: () => Promise<any>
  userInfo?: any
  userId?: number | null
}
const TOKEN_KEY = "my-jwt"
const USER_ID_KEY = "user-id"
const USER_INFO_KEY = "user-info"

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [authState, setAuthState] = useState<{
    token: string | null
    authenticated: boolean | null
  }>({
    token: null,
    authenticated: null,
  })

  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authState.token}`
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [authState.token])

  const [userInfo, setUserInfo] = useState<any>(null)
  const [userId, setUserId] = useState<number | null>(null)

  const loadToken = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    const storedUserId = await SecureStore.getItemAsync(USER_ID_KEY)
    const storedUserInfo = await SecureStore.getItemAsync(USER_INFO_KEY)

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setAuthState({ token, authenticated: true })

      if (storedUserId) setUserId(Number(storedUserId))
      if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo))
    } else {
      await logout()
    }
  }

  useEffect(() => {
    loadToken()
    setLoading(false)
  }, [])

  if (loading) {
    return null
  }
  const register = async (
    name: string,
    email: string,
    document: string,
    password: string,
  ) => {
    try {
      const result = await API_URL.post(`/auth/register`, {
        name,
        email,
        document,
        password,
      })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          error: true,
          msg: error.response.data?.message,
        }
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const result = await API_URL.post(`/auth/login`, {
        email,
        password,
      })
      const tempToken = result.data.result.token
      const user = result.data.result.user

      setAuthState({ token: tempToken, authenticated: true })
      setUserId(user.id)
      const { id, ...userWithoutId } = user
      setUserInfo(userWithoutId)

      API_URL.defaults.headers.common["Authorization"] = `Bearer ${tempToken}`

      await SecureStore.setItemAsync(TOKEN_KEY, tempToken)
      await SecureStore.setItemAsync(USER_ID_KEY, String(user.id))
      await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(user))

      return result
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return {
          error: true,
          msg: error.response.data?.message,
        }
      }
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    await SecureStore.deleteItemAsync(USER_ID_KEY)
    await SecureStore.deleteItemAsync(USER_INFO_KEY)

    axios.defaults.headers.common["Authorization"] = ""

    setAuthState({ token: null, authenticated: false })
    setUserInfo(null)
    setUserId(null)
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
    userInfo,
    userId,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
