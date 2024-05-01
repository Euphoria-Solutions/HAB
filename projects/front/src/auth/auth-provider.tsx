import React, { createContext, useContext, useState } from 'react'

type User = {
  id: string
  username: string
  phoneNumber: string
  job: 'mechanic' | 'engineer' | 'manager' | 'driver'
  firstname: string
  lastname: string
  notifications?: {
    request: string
    title: string
    userRequested?: User
  }[]
}

type AuthContextType = {
  user: User | null
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
  const [user, setUser] = useState<User | null>(null)

  const signIn = async (
    username: string,
    firstname: string,
    lastname: string
  ) => {
    const dummyUser: User = {
      id: '1',
      username: username,
      job: 'manager',
      firstname: firstname,
      lastname: lastname,
      phoneNumber: '',
    }
    setUser(dummyUser)
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
