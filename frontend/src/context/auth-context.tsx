import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import axios, { type AxiosInstance } from "axios"
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const api = useMemo(() => {
    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }, [token])

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true)
        const { data: res } = await api.get("/users/getUser")
        setUser(res)
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      const { data: response } = await api.post(`/auth/login`, { email, password })
      toast.success("Logged in", {
        description: response.message,
      })
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem("token", response.token)
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }

  }

  const signup = async (name, email, password) => {
    try {
      setIsLoading(true)
      const { data: response } = await api.post(`/auth/signup`, { name, email, password })
      toast.success(response.message)
      navigate("/login")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    navigate("/login")

    toast.success("Logged out", {
      description: "You have been logged out successfully.",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        api
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

function getURL(link: string) {
  const parsedURL = new URL(link);
  const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;
  return baseURL;
}


const currentURL = window.location.href;
export const API_URL = `${getURL(currentURL)}/api/`;

export const useAPI = (): AxiosInstance => {
  const { api } = useAuth()
  return api
}