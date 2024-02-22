import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { TextInput } from 'react-native-gesture-handler'
import { ShowIcon } from '../../assets/icons/show-icon'
import { HideIcon } from '../../assets/icons/hide-icon'
import { ConfirmIcon } from '../../assets/icons/confirm-icon'

type LoginInputType = {
  confirmActive?: boolean
  editable?: boolean
  label?: string
  password?: boolean
  placeholder?: string
  setConfirmActive?: (_v: boolean) => void
  error: string
  value: string
  setError: (_v: string) => void
  setValue: (_v: string) => void
}

const LoginInput: React.FC<LoginInputType> = ({
  confirmActive,
  setConfirmActive,
  error = '',
  label,
  password = false,
  placeholder,
  setError,
  setValue,
  value,
  editable,
  ...other
}) => {
  const { theme } = useTheme()
  const [showPass, setShowPass] = useState(false)
  const [focus, setFocus] = useState(false)

  const handlePasswordChange = (text: string) => {
    setError('')
    if (setConfirmActive != null) {
      setConfirmActive(false)
    }
    setValue(text)
  }
  const handleFocus = () => {
    setFocus(true)
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
      color: theme.background,
      height: 20,
      justifyContent: 'center',
      margin: 15,
      width: 20,
    },
    confirmIcon: {
      color: theme.background,
    },
    container: {
      gap: 7,
    },
    errorContainer: {
      flexDirection: 'row',
      gap: 4,
      paddingHorizontal: 16,
    },
    errorIcon: {
      backgroundColor: theme.red,
      borderRadius: 8,
      height: 16,
      width: 16,
    },
    errorIconText: {
      color: theme.background,
      textAlign: 'center',
    },
    errorText: {
      color: theme.red,
      fontSize: 12,
      fontWeight: '500',
    },
    input: {
      flex: 1,
      fontSize: 16,
      padding: 15,
    },
    inputContainer: {
      backgroundColor: theme.highlight,
      borderColor: error ? theme.red : focus ? theme.focus : theme.gray,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
    },
    label: {
      color: theme.text,
      fontSize: 15,
      fontWeight: '500',
    },
    showButton: {
      justifyContent: 'center',
      padding: 15,
    },
    showHideIcon: {
      color: theme.gray,
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
          style={styles.input}
          placeholder={placeholder}
          autoCapitalize='none'
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
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

export default LoginInput
