import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { TextInput } from 'react-native-gesture-handler'
import { ShowIcon, HideIcon, ConfirmIcon } from '../../assets/icons/'

type LoginInputType = {
  confirmActive?: boolean
  editable?: boolean
  label?: string
  password?: boolean
  placeholder?: string
  setConfirmActive?: (_v: boolean) => void
  error?: string
  value: string
  setError?: (_v: string) => void
  setValue: (_v: string) => void
  style?: object
}

export const LoginInput: React.FC<LoginInputType & TextInputProps> = ({
  confirmActive,
  setConfirmActive,
  error = '',
  label,
  password = false,
  placeholder,
  setError,
  setValue,
  value,
  editable = true,
  style,
  ...other
}) => {
  const { theme } = useTheme()
  const [showPass, setShowPass] = useState(false)
  const [focus, setFocus] = useState(false)

  const handlePasswordChange = (text: string) => {
    setError && setError('')
    if (setConfirmActive != null) {
      setConfirmActive(false)
    }
    setValue(text)
  }
  const handleFocus = () => {
    setFocus(true)
    setError && setError('')
  }
  const handleBlur = () => {
    setFocus(false)
  }
  const showPassChange = () => {
    setShowPass(prev => !prev)
  }

  const styles = StyleSheet.create({
    confirm: {
      alignItems: 'center',
      backgroundColor: theme.green,
      borderRadius: 10,
      height: 20,
      justifyContent: 'center',
      margin: 15,
      width: 20,
    },
    confirmIcon: {
      color: theme.white,
    },
    container: {
      gap: 8,
    },
    errorContainer: {
      flexDirection: 'row',
      gap: 4,
      paddingHorizontal: 16,
    },
    errorIcon: {
      alignItems: 'center',
      backgroundColor: theme.red,
      borderRadius: 8,
      height: 16,
      justifyContent: 'center',
      width: 16,
    },
    errorIconText: {
      color: theme.white,
      textAlign: 'center',
    },
    errorText: {
      color: theme.red,
      fontFamily: theme.commi600,
      fontSize: 12,
    },
    input: {
      color: theme.text,
      flex: 1,
      fontFamily: theme.nunito800,
      fontSize: 15,
      padding: 15,
    },
    inputContainer: {
      backgroundColor: theme.lightBg,
      borderColor: error ? theme.red : focus ? theme.primary : theme.lightBg,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
    },
    label: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 14,
      marginBottom: 2,
    },
    showButton: {
      justifyContent: 'center',
      padding: 15,
    },
    showHideIcon: {
      color: theme.iconBg,
    },
  })

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={handlePasswordChange}
          secureTextEntry={password && !showPass}
          style={{ ...styles.input, ...style }}
          placeholder={placeholder}
          placeholderTextColor={theme.iconBg}
          autoCapitalize='none'
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          selectionColor={theme.primary}
          {...other}
        />
        {/* Button with icon */}
        {password ? (
          <TouchableOpacity
            disabled={!editable}
            onPress={showPassChange}
            style={styles.showButton}
          >
            {!showPass ? (
              <ShowIcon style={styles.showHideIcon} />
            ) : (
              <HideIcon style={styles.showHideIcon} />
            )}
          </TouchableOpacity>
        ) : (
          confirmActive && (
            <View style={styles.confirm}>
              <ConfirmIcon style={styles.confirmIcon} />
            </View>
          )
        )}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <View style={styles.errorIcon}>
            <Text style={styles.errorIconText}>!</Text>
          </View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  )
}
