// ThemeContext.js
import React, { createContext, useState, useContext } from 'react'

type ConstantThemeType = {
  blue900: string
  blue800: string
  blue700: string
  blue500: string
  grey500: string
  grey400: string
  grey300: string
  grey200: string
  grey100: string
  purple900: string
  purple800: string
  purple200: string
  green: string
  red: string
  yellow: string
  black: string
  white: string
}

type VariableThemeType = {
  bg: string
  lightBg: string
  text: string
  darktext: string
  border: string
  primary: string
  primaryActive: string
  primaryDisabled: string
  iconBg: string
  loginBg: string
  loginText: string
}

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  theme: VariableThemeType & ConstantThemeType
  toggleTheme: () => void
  isDarkMode: boolean
}

const constantTheme: ConstantThemeType = {
  blue900: '#242746',
  blue800: '#343563',
  blue700: '#484A84',
  blue500: '#454781',
  grey500: '#787D90',
  grey400: '#9BA0B4',
  grey300: '#C7CDE5',
  grey200: '#F6F6F6',
  grey100: '#EEF0F9',
  purple900: '#743ED8',
  purple800: '#885BDC',
  purple200: '#BFA9E7',
  green: '#25BE3E',
  red: '#E42727',
  yellow: '#F3C95D',
  black: '#000',
  white: '#fff',
}

const lightTheme: VariableThemeType & ConstantThemeType = {
  bg: constantTheme.blue900,
  lightBg: constantTheme.blue800,
  text: constantTheme.grey100,
  darktext: constantTheme.grey300,
  border: constantTheme.grey500,
  primary: constantTheme.purple800,
  primaryActive: constantTheme.purple900,
  primaryDisabled: constantTheme.purple200,
  iconBg: constantTheme.grey400,
  loginBg: constantTheme.grey200,
  loginText: constantTheme.grey500,
  ...constantTheme,
}

const darkTheme: VariableThemeType & ConstantThemeType = {
  bg: constantTheme.blue900,
  lightBg: constantTheme.blue800,
  text: constantTheme.grey100,
  darktext: constantTheme.grey300,
  border: constantTheme.blue500,
  primary: constantTheme.purple800,
  primaryActive: constantTheme.purple900,
  primaryDisabled: constantTheme.purple200,
  iconBg: constantTheme.grey400,
  loginBg: constantTheme.grey200,
  loginText: constantTheme.grey500,
  ...constantTheme,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Create the ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)

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
