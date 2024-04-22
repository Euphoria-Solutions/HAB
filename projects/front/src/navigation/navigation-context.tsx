import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type NavigationProviderProps = {
  children: React.ReactNode
}

type NavigationContextType = {
  id: string | null
  setId: Dispatch<SetStateAction<string | null>>
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
)

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const [id, setId] = useState<string | null>('')

  return (
    <NavigationContext.Provider value={{ id, setId }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNav = (): NavigationContextType => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
