import React, { createContext, useContext, useState } from 'react'
import { UserType } from '../utils'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_USERS, LOGIN, VERIFY_TOKEN } from '../graphql/'

interface LoginReturnType {
  success: boolean
  user: UserType | null
}

type AuthContextType = {
  user: UserType | null
  signIn: (
    _identifier: string,
    _password: string
  ) => Promise<LoginReturnType | null>
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
  const [VerifyToken] = useMutation(VERIFY_TOKEN)
  const [LogIn] = useMutation(LOGIN)
  const [getUserQuery] = useLazyQuery(GET_USERS)

  const signIn = async (
    _identifier: string,
    password: string
  ): Promise<{ success: boolean; user: UserType | null }> => {
    try {
      const { data: authInformation } = await LogIn({
        variables: {
          username: _identifier,
          phoneNumber: _identifier,
          password,
        },
      })

      if (authInformation && authInformation.login) {
        const { data: verifyData } = await VerifyToken({
          variables: { token: authInformation.login },
        })
        if (verifyData && verifyData.verifyToken) {
          const { data: userData } = await getUserQuery({
            variables: {
              username: verifyData.verifyToken.username,
            },
          })
          if (userData && userData.getUsers && userData.getUsers.length > 0) {
            const user = userData.getUsers[0]
            setUser(user)
            return { success: true, user }
          } else {
            return { success: false, user: null }
          }
        } else {
          return { success: false, user: null }
        }
      } else {
        return { success: false, user: null }
      }
    } catch (err) {
      console.error('Login error:', (err as Error).message)
      return { success: false, user: null }
    }
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
