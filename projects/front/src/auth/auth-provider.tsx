import React, { createContext, useContext, useState } from 'react'
import { UserType, dummyUser } from '../utils'

type AuthContextType = {
  user: UserType | null
  signIn: (_u: string, _p: string, _fn: string, _ln: string) => Promise<void>
  signOut: () => void
}

type AuthProviderType = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null)

  const signIn = async (
    username: string,
    _p: string,
    firstname: string,
    lastname: string
  ) => {
    setUser({ ...dummyUser, username, firstname, lastname })
  }

  const signOut = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
