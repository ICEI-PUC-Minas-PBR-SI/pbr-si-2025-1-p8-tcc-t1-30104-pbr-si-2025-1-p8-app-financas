import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import API_URL from '../services/api'

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null }
  onRegister?: (name: string, email: string, password: string) => Promise<any>
  onLogin?: (email: string, password: string) => Promise<any>
  onLogout?: () => Promise<any>
}

const TOKEN_KEY = 'my-jwt'

const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null
    authenticated: boolean | null
  }>({
    token: null,
    authenticated: null,
  })

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY)
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setAuthState({ token, authenticated: true })
      }
    }
    loadToken()
  }, [])

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await API_URL.post(`/auth/register`, {
        name,
        email,
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
      setAuthState({ token: tempToken, authenticated: true })

      axios.defaults.headers.common['Authorization'] = `Bearer ${tempToken}`

      await SecureStore.setItemAsync(TOKEN_KEY, tempToken)

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

    axios.defaults.headers.common['Authorization'] = ''

    setAuthState({ token: null, authenticated: false })
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
