import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userName: string
  login: (name: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userName: '',
  login: () => {},
  logout: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  const login = (name: string) => {
    setUserName(name)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserName('')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
