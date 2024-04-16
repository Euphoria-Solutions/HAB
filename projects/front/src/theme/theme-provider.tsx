import React, { createContext, useState, useContext, useEffect } from 'react'

type ConstantThemeType = {
  blue950: string
  blue900: string
  blue850: string
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
  darkBg: string
  text: string
  darktext: string
  border: string
  stroke: string
  primary: string
  primaryActive: string
  primaryDisabled: string
  iconBg: string
  loginBg: string
  loginText: string
}

type FontType = {
  commi: string
  commi100: string
  commi200: string
  commi300: string
  commi400: string
  commi500: string
  commi600: string
  commi700: string
  commi800: string
  commi900: string
  nunito: string
  nunito200: string
  nunito300: string
  nunito400: string
  nunito500: string
  nunito600: string
  nunito700: string
  nunito800: string
  nunito900: string
}

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  theme: VariableThemeType & ConstantThemeType & FontType
  toggleTheme: () => void
  isDarkMode: boolean
}

const constantTheme: ConstantThemeType = {
  blue950: '#2B2F52',
  blue900: '#242746',
  blue850: '#2C2C4D',
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

const lightTheme: VariableThemeType = {
  bg: constantTheme.blue900,
  lightBg: constantTheme.blue800,
  darkBg: constantTheme.blue950,
  text: constantTheme.grey100,
  darktext: constantTheme.grey300,
  border: constantTheme.grey500,
  stroke: constantTheme.blue850,
  primary: constantTheme.purple800,
  primaryActive: constantTheme.purple900,
  primaryDisabled: constantTheme.purple200,
  iconBg: constantTheme.grey400,
  loginBg: constantTheme.grey200,
  loginText: constantTheme.grey500,
}

const darkTheme: VariableThemeType = {
  bg: constantTheme.blue900,
  lightBg: constantTheme.blue800,
  darkBg: constantTheme.blue950,
  text: constantTheme.grey100,
  darktext: constantTheme.grey300,
  border: constantTheme.blue500,
  stroke: constantTheme.blue850,
  primary: constantTheme.purple800,
  primaryActive: constantTheme.purple900,
  primaryDisabled: constantTheme.purple200,
  iconBg: constantTheme.grey400,
  loginBg: constantTheme.grey200,
  loginText: constantTheme.grey500,
}

const font: FontType = {
  commi: 'Commissioner-Regular',
  commi100: 'Commissioner-Thin',
  commi200: 'Commissioner-ExtraLight',
  commi300: 'Commissioner-Light',
  commi400: 'Commissioner-Regular',
  commi500: 'Commissioner-Medium',
  commi600: 'Commissioner-SemiBold',
  commi700: 'Commissioner-Bold',
  commi800: 'Commissioner-ExtraBold',
  commi900: 'Commissioner-Black',
  nunito: 'Nunito-Regular',
  nunito200: 'Nunito-ExtraLight',
  nunito300: 'Nunito-Light',
  nunito400: 'Nunito-Regular',
  nunito500: 'Nunito-Medium',
  nunito600: 'Nunito-SemiBold',
  nunito700: 'Nunito-Bold',
  nunito800: 'Nunito-ExtraBold',
  nunito900: 'Nunito-Black',
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [theme, setTheme] = useState<
    VariableThemeType & ConstantThemeType & FontType
  >(
    isDarkMode
      ? { ...darkTheme, ...font, ...constantTheme }
      : { ...lightTheme, ...font, ...constantTheme }
  )

  useEffect(() => {
    setTheme(() => {
      const temp = isDarkMode ? darkTheme : lightTheme
      return { ...temp, ...constantTheme, ...font }
    })
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
