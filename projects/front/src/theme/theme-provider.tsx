// ThemeContext.js
import React, { createContext, useState, useContext } from 'react'

type Theme = {
  background: string
  gray: string
  green: string
  highlight: string
  primary: string
  red: string
  text: string
  focus: string
}

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  isDarkMode: boolean
}

const lightTheme: Theme = {
  background: '#fff',
  focus: '#666666',
  gray: '#B0B0B0',
  green: '#34C759',
  highlight: '#F8F8F8',
  primary: '#885BDC',
  red: '#FF3B30',
  text: '#737171',
}

const darkTheme: Theme = {
  background: '#fff',
  focus: '666666',
  gray: '#B0B0B0',
  green: '#34C759',
  highlight: '#F8F8F8',
  primary: '#885BDC',
  red: '#FF3B30',
  text: '#737171',
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Create the ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const theme = isDarkMode ? darkTheme : lightTheme

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Create a custom hook to use the theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
