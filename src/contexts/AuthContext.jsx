import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('chill_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('chill_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, this would be an actual API call
      // For now, accept any non-empty credentials
      if (username && password) {
        const userData = {
          id: Date.now(),
          username,
          email: `${username}@example.com`,
          isPremium: false
        }
        
        setUser(userData)
        localStorage.setItem('chill_user', JSON.stringify(userData))
        navigate('/')
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (username, password) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, this would be an actual API call
      if (username && password) {
        const userData = {
          id: Date.now(),
          username,
          email: `${username}@example.com`,
          isPremium: false
        }
        
        setUser(userData)
        localStorage.setItem('chill_user', JSON.stringify(userData))
        navigate('/')
        return { success: true }
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('chill_user')
    navigate('/login')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}