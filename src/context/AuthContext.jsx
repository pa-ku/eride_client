import { createContext, useContext, useEffect, useState } from 'react'
export const AuthContext = createContext()
import { tokenRequest } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import cookies from 'js-cookie'
import { API_ROUTE } from '../api/API_ROUTE'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useContext debe estar dentro de un provider')
  }
  return context
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  async function userLogin(user) {
    try {
      const res = await fetch(`${API_ROUTE}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      })
      const data = await res.json()

      if (data.error) {
        console.log(res)
        setUser(null)
        return setMessage(data.error[0])
      } else {
        setUser(res)
        setIsAuth(true)
        navigate('/')
        console.log('login successful')
      }
    } catch (error) {
      console.log('login error', error)
    }
  }

  async function userRegister(user) {
    try {
      const res = await fetch(`${API_ROUTE}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
      })
      const data = await res.json()
      console.log(data)

      if (data.error) {
        setUser(null)
        setMessage(data.error[0])
        return
      } else {
        setUser(data)
        setIsAuth(true)
        navigate('/')
      }
    } catch (error) {
      console.log('Login error', error)
    }
  }

  async function validateToken() {
    try {
      const cookie = cookies.get()
      if (!cookie.token) return console.log('No hay un token')
      else {
        const res = await tokenRequest(cookie.token)
        if (res.error) {
          setLoading(false)
          setIsAuth(false)
          setUser(null)
          console.log('no tiene acceso')
          return
        } else {
          setLoading(false)
          setIsAuth(true)
          console.log(res)
          setUser(res)
          console.log('usuario cargado correctamente')
          return
        }
      }
    } catch (error) {
      console.log('error al validar', error)
    }
  }

  function userLogout() {
    try {
      cookies.remove('token')
      setIsAuth(false)
      setUser(null)
      navigate('/')
    } catch (error) {
      console.log('error al salir', error)
    }
  }

  useEffect(() => {
    validateToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        userRegister,
        userLogout,
        user,
        isAuth,
        message,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
