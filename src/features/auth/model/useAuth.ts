import { useState } from "react"
import axios from "axios"

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token") || sessionStorage.getItem("token")
  })

  const login = async (username: string, password: string, remember: boolean) => {
    try {
      setIsLoading(true)
      setError(null)

      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password
      })

      const token = res.data.token

      setToken(token)

      if (remember) {
        localStorage.setItem("token", token)
        localStorage.setItem("username", username)
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("username")
      } else {
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("username", username)
        localStorage.removeItem("token")
        localStorage.removeItem("username")
      }

    } catch (e: any) {
      setError(e.response?.data?.message || "Ошибка входа")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    setToken(null)
  }

  const isLoggedIn = !!token

  return {
    login,
    logout,
    token,
    isLoggedIn,
    error,
    isLoading
  }
}